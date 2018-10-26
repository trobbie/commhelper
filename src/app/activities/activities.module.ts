import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivitiesRoutingModule
  ],
  declarations: [
    MyActivitiesComponent,
    ActivityDetailComponent
  ]
})
export class ActivitiesModule { }
