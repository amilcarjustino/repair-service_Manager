import { Component, OnInit } from '@angular/core';
import { Sheet } from 'src/app/models/sheet';
import { BackendConnectService } from 'src/app/services/backend-connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-sheet',
  templateUrl: './new-sheet.page.html',
  styleUrls: ['./new-sheet.page.scss'],
})
export class NewSheetPage implements OnInit {
  sheet: Sheet = {
    id: '',
    executedAtTheCustomer: false,
    customer: { name: '' },
    serviceType: 'Repair',
    costEstimation: { isRequired: false },
    isDone: false,
    product: { brand: '', model: '' },
    description: '',
    partsListApplied: [],
    observations: '',
    creationDate: new Date(),
    receivedDate: new Date(),
    initialDate: new Date(),
    finalizedDate: new Date()
  };

  constructor(private backendConnectService: BackendConnectService, private router: Router){}

  ngOnInit() {
    console.log(this.sheet);
  }

  validateSheet() {
    if (
      this.sheet.customer.name &&
      this.sheet.finalizedDate &&
      this.sheet.initialDate &&
      this.sheet.product.brand &&
      this.sheet.product.model &&
      this.sheet.receivedDate) {
      return false;
    }
    return true;
  }

  save(){
    this.backendConnectService.addNewSheet(this.sheet);
  }
}
