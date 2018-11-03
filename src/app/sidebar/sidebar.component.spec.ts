import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MyActivitiesComponent } from '../activities/my-activities/my-activities.component';
import { ActivityDetailComponent } from '../activities/activity-detail/activity-detail.component';
import { SharedModule } from '../shared/shared.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        MyActivitiesComponent,
        ActivityDetailComponent
      ],
      imports: [
        SharedModule,
        AppRoutingModule,
        FormsModule
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
