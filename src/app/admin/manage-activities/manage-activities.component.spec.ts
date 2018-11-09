import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivitiesComponent } from './manage-activities.component';
import { by } from 'protractor';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesModule } from 'src/app/activities/activities.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ManageActivitiesComponent', () => {
  let component: ManageActivitiesComponent;
  let fixture: ComponentFixture<ManageActivitiesComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManageActivitiesComponent
      ],
      imports: [
        SharedModule,
        ActivitiesModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActivitiesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
