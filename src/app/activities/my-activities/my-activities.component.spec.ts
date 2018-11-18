import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActivitiesComponent } from './my-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MyactivitiesComponent', () => {
  let component: MyActivitiesComponent;
  let fixture: ComponentFixture<MyActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyActivitiesComponent,
        ActivityDetailsComponent
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
    fixture = TestBed.createComponent(MyActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
