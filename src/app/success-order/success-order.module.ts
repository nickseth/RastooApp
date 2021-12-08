import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessOrderPageRoutingModule } from './success-order-routing.module';

import { SuccessOrderPage } from './success-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessOrderPageRoutingModule
  ],
  declarations: [SuccessOrderPage]
})
export class SuccessOrderPageModule {}
