import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ManageActivitiesComponent } from './manage-activities.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivitiesModule } from '../../activities/activities.module';
import { AppRoutingModule } from '../../app-routing.module';

describe('ManageActivitiesComponent', () => {
  let component: ManageActivitiesComponent;
  let fixture: ComponentFixture<ManageActivitiesComponent>;
  let element: HTMLElement;
  let httpClient = HttpClient;
  let httpTestingController = HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManageActivitiesComponent,
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        ActivitiesModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActivitiesComponent);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
