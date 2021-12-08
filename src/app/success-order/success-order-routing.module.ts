import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessOrderPage } from './success-order.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessOrderPageRoutingModule {}
