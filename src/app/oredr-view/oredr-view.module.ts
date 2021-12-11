import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OredrViewPageRoutingModule } from './oredr-view-routing.module';

import { OredrViewPage } from './oredr-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OredrViewPageRoutingModule
  ],
  declarations: [OredrViewPage]
})
export class OredrViewPageModule {}
