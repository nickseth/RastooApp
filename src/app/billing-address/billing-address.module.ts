import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingAddressPageRoutingModule } from './billing-address-routing.module';

import { BillingAddressPage } from './billing-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingAddressPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BillingAddressPage]
})
export class BillingAddressPageModule {}
