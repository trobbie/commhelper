import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { SharedModule } from '../shared/shared.module';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ActivitiesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    MyActivitiesComponent,
    ActivitiesComponent,
    ActivityDetailsComponent
  ],
  exports: [
    ActivityDetailsComponent
  ]
})
export class ActivitiesModule { }
