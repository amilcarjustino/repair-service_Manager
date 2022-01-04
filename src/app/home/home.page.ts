import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendConnectService } from '../services/backend-connect.service';
import { Sheet } from '../models/Sheet';
import { AuthService } from '../services/auth.service';
import { PopoverController } from '@ionic/angular';
import { ElipsisMenuComponent } from '../components/elipsis-menu/elipsis-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sheets = [];
  constructor(
    private backendConnectService: BackendConnectService,
    private authService: AuthService,
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ionViewDidEnter() { }

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

  onAddNewSheet() {
    this.router.navigateByUrl('new-sheet');
    const sheet: Sheet = {
      id: 'test',
      executedAtTheCustomer: false,
      customer: { name: 'Reader' },
      serviceType: 'Repair',
      costEstimation: { isRequired: false },
      product: { brand: '', model: '' },
      isDone: false,
      description: 'Nothing',
      creationDate: new Date(),
      receivedDate: new Date(),
      initialDate: new Date(),
      finalizedDate: new Date(),
    };
    this.backendConnectService.addNewSheet(sheet);
  }

  
async presentPopover(ev){
  const popover = await this.popoverController.create({
    component:ElipsisMenuComponent,
    event: ev,
    translucent: true,
    dismissOnSelect: true
  });

  await popover.present();

  const {role} = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);

}


}
