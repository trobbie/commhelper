import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MyActivitiesComponent } from '../my-activities/my-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivitiesListComponent } from '../activities-list/activities-list.component';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesComponent,
        ActivitiesListComponent,
        ActivityDetailsComponent,
        MyActivitiesComponent
      ],
      imports: [
        SharedModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
