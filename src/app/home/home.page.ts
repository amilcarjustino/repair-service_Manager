import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendConnectService } from '../services/backend-connect.service';
import { Sheet } from '../models/sheet';
import { HttpResponseData } from '../models/HttpResponseData';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sheets = [];
  constructor(
    private backendConnectService: BackendConnectService,
    private router: Router
  ) { }

  ionViewDidEnter() {}

  myInit() {
  /*   this.backendConnectService.getTocken().then(() => {

      console.log(this.backendConnectService.getIsUserAuthenticated().isUserAuthenticated);
      if (
        !this.backendConnectService.getIsUserAuthenticated().isUserAuthenticated
      ) {
        this.router.navigate(['login']);
      } else {
        const userIdToken =
          this.backendConnectService.getIsUserAuthenticated().userIdToken;
        // console.log('did get here with token: ', userIdToken);
        this.getListOfObjectFromServer(userIdToken);
      }
    }); */
  }

  getListOfObjectFromServer(idToken) {
    this.backendConnectService.getList(idToken).subscribe((data) => {
      this.sheets = Object.values(data).reverse();
      console.log(this.sheets);
    });
  }

  onAddNewSheet() {
    this.router.navigateByUrl('new-sheet');
    const sheet: Sheet = {
      id: 'test',
      executedAtTheCustomer: false,
      customer: { name: 'Reader' },
      serviceType: 'Repair',
      costEstimation: { isRequired: false },
      product: 'Machine',
      isDone: false,
      description: 'Nothing',
      creationDate: new Date(),
      receivedDate: new Date(),
      initialDate: new Date(),
      finalizedDate: new Date(),
    };
    this.backendConnectService.addNewSheet(sheet);
  }
}
