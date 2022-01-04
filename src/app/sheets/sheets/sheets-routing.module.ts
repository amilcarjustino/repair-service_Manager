import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SheetsPage } from './sheets.page';

const routes: Routes = [
  {
    path: '',
    component: SheetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SheetsPageRoutingModule {}
