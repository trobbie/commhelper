import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesListComponent } from './activities-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { AppRoutingModule } from '../../app-routing.module';

describe('ActivitiesListComponent', () => {
  let component: ActivitiesListComponent;
  let fixture: ComponentFixture<ActivitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(ActivitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
