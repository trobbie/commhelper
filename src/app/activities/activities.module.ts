import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { MyactivitiesComponent } from './myactivities/myactivities.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivitiesRoutingModule
  ],
  declarations: [
    MyactivitiesComponent,
    ActivityDetailComponent
  ]
})
export class ActivitiesModule { }
