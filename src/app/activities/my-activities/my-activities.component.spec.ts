import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MyActivitiesComponent } from './my-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivitiesListComponent } from '../activities-list/activities-list.component';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';

describe('MyactivitiesComponent', () => {
  let component: MyActivitiesComponent;
  let fixture: ComponentFixture<MyActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyActivitiesComponent,
        ActivitiesListComponent,
        ActivityDetailsComponent
      ],
      imports: [
        SharedModule,
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
