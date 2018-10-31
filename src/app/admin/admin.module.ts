import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageActivitiesComponent } from './manage-activities/manage-activities.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageActivitiesComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
