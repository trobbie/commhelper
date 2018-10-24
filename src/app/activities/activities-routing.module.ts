import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyactivitiesComponent } from './myactivities/myactivities.component';

const routes: Routes = [
  {
    path: 'myactivities',
    component: MyactivitiesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivitiesRoutingModule { }
