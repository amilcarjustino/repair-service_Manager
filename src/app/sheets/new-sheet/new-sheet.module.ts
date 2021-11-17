import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSheetPageRoutingModule } from './new-sheet-routing.module';

import { NewSheetPage } from './new-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSheetPageRoutingModule
  ],
  declarations: [NewSheetPage]
})
export class NewSheetPageModule {}
