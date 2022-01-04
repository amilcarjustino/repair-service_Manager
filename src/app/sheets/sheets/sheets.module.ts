import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SheetsPageRoutingModule } from './sheets-routing.module';

import { SheetsPage } from './sheets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SheetsPageRoutingModule
  ],
  declarations: [SheetsPage]
})
export class SheetsPageModule {}
