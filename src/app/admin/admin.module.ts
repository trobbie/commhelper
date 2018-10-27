import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageActivitiesComponent } from './manage-activities/manage-activities.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageActivitiesComponent
  ]
})
export class AdminModule { }
