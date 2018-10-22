import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyactivitiesComponent } from './myactivities/myactivities.component';

const routes: Routes = [
  {
    path: '',
    component: MyactivitiesComponent
  },
  {
    path: 'myactivities',
    component: MyactivitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
