import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityDetailResolverService } from './activity-detail-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { CanDeactivateGuard } from '../_guards/can-deactivate.guard';

const activitiesRoutes: Routes = [
  {
    path: 'myactivities',
    component: ActivitiesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: MyActivitiesComponent,
        children: [
          {
            path: ':id',
            component: ActivityDetailComponent,
            canDeactivate: [CanDeactivateGuard],
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
