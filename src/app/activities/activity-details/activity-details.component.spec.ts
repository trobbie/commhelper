import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ActivityDetailsComponent } from './activity-details.component';
import { SharedModule } from '../../shared/shared.module';
import { Activity } from 'src/app/_models/activity.model';
import { asyncData } from 'src/testing';
import { ActivitiesService } from 'src/app/_services/activities.service';

let component: ActivityDetailsComponent;
let fixture: ComponentFixture<ActivityDetailsComponent>;
let page: Page;
let asSpy: ActivitiesServiceSpy;

class ActivitiesServiceSpy {
  testActivity: Activity = {id: 42, name: 'TestActivity42' };

  /* emit cloned test activity */
  getActivity = jasmine.createSpy('getActivity').and.callFake(
    () => asyncData(Object.assign({}, this.testActivity))
  );

  /* emit clone of test activity, with changes merged in */
  saveActivity = jasmine.createSpy('saveActivity').and.callFake(
    (activity: Activity) => asyncData(Object.assign(this.testActivity, activity))
  );
}

describe('ActivityDetailsComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityDetailsComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        // ActivitiesService at this level is IRRELEVANT!
        { provide: ActivitiesService, useValue: {} }
      ]
    })
    // Override component's own provider
    .overrideComponent(ActivityDetailsComponent, {
      set: {
        providers: [
          { provide: ActivitiesService, useClass: ActivitiesServiceSpy }
        ]
      }
    })
    .compileComponents()
    .then(createComponent);

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called `getActivity`', () => {
    expect(asSpy.getActivity.calls.count()).toBe(1, 'getActivity called once');
  });

  it('should disable save/cancel buttons upon initially opening panel', () => {
    expect(page.buttonSave.nativeElement.disabled).toBe(true);
  });
});

/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(ActivityDetailsComponent);
  component = fixture.componentInstance;

  // change detection triggers ngOnInit
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the activities and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
    // get the component's injected ActivitiesServiceSpy
    asSpy = fixture.debugElement.injector.get(ActivitiesService) as any;
  });
}

class Page {
  buttonSave: DebugElement;
  buttonCancel: DebugElement;

  constructor() {
    this.buttonSave = fixture.debugElement.query(By.css('.buttonSave'));
    this.buttonCancel = fixture.debugElement.query(By.css('.buttonCancel'));
  }
}
