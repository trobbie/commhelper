import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminModule } from '../admin/admin.module';
import { MyActivitiesComponent } from '../activities/my-activities/my-activities.component';
import { ActivityDetailComponent } from '../activities/activity-detail/activity-detail.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { ManageActivitiesComponent } from '../admin/manage-activities/manage-activities.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        MyActivitiesComponent,
        ActivityDetailComponent,
        AdminDashboardComponent,
        ManageActivitiesComponent
      ],
      imports: [ AppRoutingModule, FormsModule, AdminModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
