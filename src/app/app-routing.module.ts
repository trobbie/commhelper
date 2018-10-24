import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyactivitiesComponent } from './activities/myactivities/myactivities.component';

const routes: Routes = [
  {
    path: '',
    component: MyactivitiesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
