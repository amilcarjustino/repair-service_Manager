import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSheetPage } from './new-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: NewSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSheetPageRoutingModule {}
