import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyEventsComponent } from './my-events/my-events.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'myevents',
    component: MyEventsComponent,
    canActivate: [AuthGuard]
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
export class EventsRoutingModule { }
