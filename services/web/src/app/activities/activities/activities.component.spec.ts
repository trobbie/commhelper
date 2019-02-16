import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MyActivitiesComponent } from '../my-activities/my-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesComponent,
        ActivityDetailsComponent,
        MyActivitiesComponent
      ],
      imports: [
        SharedModule,
        ReactiveFormsModule,
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
