import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-elipsis-menu',
  templateUrl: './elipsis-menu.component.html',
  styleUrls: ['./elipsis-menu.component.scss'],
})
export class ElipsisMenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

}
