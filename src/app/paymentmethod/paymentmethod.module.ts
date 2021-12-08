import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentmethodPageRoutingModule } from './paymentmethod-routing.module';

import { PaymentmethodPage } from './paymentmethod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentmethodPageRoutingModule
  ],
  declarations: [PaymentmethodPage]
})
export class PaymentmethodPageModule {}
