import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropsPage } from './drops.page';

const routes: Routes = [
  {
    path: '',
    component: DropsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropsPageRoutingModule {}
