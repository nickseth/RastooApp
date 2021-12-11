import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OredrViewPage } from './oredr-view.page';

const routes: Routes = [
  {
    path: '',
    component: OredrViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OredrViewPageRoutingModule {}
