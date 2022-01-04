import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BackendConnectService } from 'src/app/services/backend-connect.service';

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.page.html',
  styleUrls: ['./sheets.page.scss'],
})
export class SheetsPage implements OnInit {
  private sheets = [];
  private userIdToken = '';

  constructor(
    private backendConnectService: BackendConnectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkUserAuthenticated();
  }

  checkUserAuthenticated() {
    this.authService
      .checkUserAuthenticated()
      .then((user: User) => {
        // console.log(user);
        this.userIdToken = user.userToken;
        return user;
      })
      .then((user) => {
        //console.log(user);
        console.log(user.userToken);
      });
  }

  getListOfObjectFromServer(idToken) {
    this.backendConnectService.getList(idToken).subscribe((data) => {
      this.sheets = Object.values(data).reverse();
      console.log(this.sheets);
    });
  }
}
