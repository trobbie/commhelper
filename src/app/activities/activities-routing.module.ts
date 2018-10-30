import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityDetailResolverService } from './activity-detail-resolver.service';

const activitiesRoutes: Routes = [
  {
    path: 'myactivities',
    component: ActivitiesComponent,
    children: [
      {
        path: '',
        component: MyActivitiesComponent,
        children: [
          {
            path: ':id',
            component: ActivityDetailComponent,
            resolve: {
              activity: ActivityDetailResolverService
            }
          },
          {
            path: '',
            component: ActivityDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(activitiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivitiesRoutingModule { }
