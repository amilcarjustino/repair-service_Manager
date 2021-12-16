import { Component, OnInit } from '@angular/core';
import { Sheet } from 'src/app/models/sheet';

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
    product: '',
    description:'',
    partsListApplied:[],
    observations:'',
    creationDate: new Date(),
    receivedDate: new Date(),
    initialDate: new Date(),
    finalizedDate: new Date()
  };

  constructor() {}

  ngOnInit() {
    console.log(this.sheet);
  }
}
