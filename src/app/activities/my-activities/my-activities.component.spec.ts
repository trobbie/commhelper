import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { MyActivitiesComponent } from './my-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MyactivitiesComponent', () => {
  let component: MyActivitiesComponent;
  let fixture: ComponentFixture<MyActivitiesComponent>;
  let httpClient = HttpClient;
  let httpTestingController = HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyActivitiesComponent,
        ActivityDetailsComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        ReactiveFormsModule,
        AppRoutingModule
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActivitiesComponent);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
