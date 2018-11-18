import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivitiesListComponent } from './activities-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ActivitiesService } from '../../_services/activities.service';
import { TestActivitiesService } from '../../_services/testing/test-activities.service';
import { getTestActivities } from '../../_services/testing/test-activities';
import { click, advance } from '../../../testing';
import { Activity } from '../../_models/activity.model';
import { DetailSummary } from '../../_models/detail-summary';

let component: ActivitiesListComponent;
let fixture: ComponentFixture<ActivitiesListComponent>;
let page: Page;
let dataService: ActivitiesService;

let activities: Activity[];
// panel 1 is "first activity" (not panel 0)
// const panelIndexOfFirstSummary = 1; // index of summary array (order displayed)

@Component({
  selector: 'app-activity-details',
  template: '<div *ngIf="activityId != null" class="activity">Stubbed Activity Details</div>'
})
class ActivityDetailsStubComponent {
  // mimic the public API
  @Input() activityId: number;
  @Output() closePanelFromDetails = new EventEmitter<number>();
  @Output() valueChangedFromDetails = new EventEmitter<boolean>();
}

describe('ActivitiesListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      declarations: [
        ActivitiesListComponent,
        ActivityDetailsStubComponent
      ],
      providers: [
        { provide: ActivitiesService, useClass: TestActivitiesService }
      ]
    })
    .compileComponents()
    .then(createComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of activities', () => {
    expect(page.accPanelHeaders.length).toBeGreaterThan(0);
  });

  it('should initialize to no selected id in the componeent, and no expanded rows', fakeAsync(() => {
    expect(component.selectedId).toBeNull();

    page.accPanelHeaders.forEach((element) =>
      expect(element.nativeElement.querySelector('.btn-link').getAttribute('aria-expanded')).toBe('false')
    );
  }));

  it('should select activity when a closed panel is clicked', fakeAsync(() => {
    const panelIndex = 1;

    expectPanelToBeOpen(panelIndex, false, 'row should be initially collapsed');
    expect(component.selectedId).toBeNull('component selected id should initially be null');

    click(page.panelDE(panelIndex));
    advance(fixture);

    expect(component.selectedId)
      .toEqual(page.panelSummary(panelIndex).id,
      'component selected id should be property assigned');
  }));

  // enable when can get isDataChanged() to work when adding FormGroup
  it('should open up panel if a panel row is clicked; all others closed', fakeAsync(() => {
    expectPanelToBeOpen(1, false, 'row should be initially collapsed');

    click(page.panelDE(1));
    advance(fixture);

    // Note: when panel is row is expanded, can also check 'aria-expanded'
    expectPanelToBeOpen(1, true, 'row is not initially collapsed');

    // NOW click _another_ row and see the effects
    click(page.panelDE(2));
    advance(fixture);

    expectPanelToBeOpen(2, true, 'clicked row should be expanded');
    expectPanelToBeOpen(1, false, 'prior expanded row should be collapsed');
  }));

  it('should disable all other panel rows when data has been changed for a selection', fakeAsync(() => {
    expect(page.panelDE(2).nativeElement.hasAttribute('disabled')).toBe(false, 'initially not disabled');

    click(page.panelDE(1));
    advance(fixture);

    // simulate data change by calling the event that the details component emits
    component.onValuesChanged(true);
    advance(fixture);

    expect(page.panelDE(2).nativeElement.hasAttribute('disabled')).toBe(true, 'onValuesChanged() did not disable panel');
  }));

  it('should close panel when onClosePanel(null) [cancel button] is called', fakeAsync(() => {
    const panelIndex = 1;
    // open first (alraedy tested this works)
    click(page.panelDE(panelIndex));
    advance(fixture);

    // simulate cancel click by calling the event that the details component emits
    component.onClosePanel(null);

    // expect(component.getSummaryList).toHaveBeenCalledWith();
    advance(fixture);

    expect(component.selectedId).toBeNull('selectedId not set to null upon onClosePanel()');
    expectPanelToBeOpen(panelIndex, false, 'onClosePanel() did not collapse panel');
  }));

  it('should close panel when onClosePanel(id) [save button] is called', fakeAsync(() => {
    const panelIndex = 1;
    // open first (alraedy tested this works)
    click(page.panelDE(panelIndex));
    advance(fixture);

    expectPanelToBeOpen(panelIndex, true, 'did not expand panel at first click');

    // simulate save click by calling the event that the details component emits
    component.onClosePanel(getActivityBackingObject(panelIndex).id);
    advance(fixture);

    expect(component.selectedId).toBeNull('selectedId not set to null upon onClosePanel()');
    expectPanelToBeOpen(panelIndex, false, 'onClosePanel() did not collapse panel');
  }));

  it('should update summary when onClosePanel(id) called', fakeAsync(() => {
    const panelIndex = 1;
    click(page.panelDE(panelIndex));
    advance(fixture);

    expectPanelToBeOpen(panelIndex, true, 'did not expand panel at first click');

    expect(page.panelDE(panelIndex).nativeElement.innerHTML)
      .toContain(page.panelSummary(panelIndex).description,
      'summary should initially be correct');

    // Update the name (which is included in the summary)
    // Do this with the service, just like the details component would have
    // before it calls onClosePanel(true)
    const currentActivity: Activity = getActivityBackingObject(panelIndex);

    const newName = '**NAMECHANGE**';
    currentActivity.name = newName;
    dataService.updateActivity(currentActivity);

    // simulate save click by calling the event that the details component emits
    component.onClosePanel(currentActivity.id);
    advance(fixture);

    expect(page.panelDE(panelIndex).nativeElement.innerHTML).toContain(newName, 'summary description should now contain the new name');
  }));

  it('should always have a "new activity" panel as its first panel', fakeAsync(() => {
    expect(page.panelDE(0).nativeElement.innerHTML).toContain(component.nameOfCreateButton);
  }));

  it('should show details component when "new activity" panel is selected', fakeAsync(() => {
    click(page.panelDE(0));
    advance(fixture);

    expect(page.openDetailsDE).not.toBeNull('could not find opened panel body');
    if (page.openDetailsDE) {
      const detailsDE = page.openDetailsDE.query(By.css('.activity'));
      expect(detailsDE).not.toBeNull('could not find activity class');
    }
  }));

  it('should add "new activity" to panel 1 position after saving', fakeAsync(() => {
    click(page.panelDE(0));
    advance(fixture);

    const newActivity: Activity = new Activity();
    newActivity.id = 99999;
    newActivity.name = 'testing';
    newActivity.dateCreated = new Date();
    dataService.addActivity(newActivity);

    // simulate save click by calling the event that the details component emits
    component.onClosePanel(newActivity.id);
    advance(fixture);

    expect(page.panelSummary(1).id).toBe(newActivity.id, 'panel 1 does not contain new activity');

  }));

});

/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(ActivitiesListComponent);
  component = fixture.componentInstance;
  dataService = TestBed.get(ActivitiesService);
  activities = getTestActivities();

  // change detection triggers ngOnInit
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the activities and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

function expectPanelToBeOpen(panelIndex: number, expectOpen: boolean, expectionFailOutput?: any) {
  expect(page.panelDE(panelIndex).nativeElement.getAttribute('aria-expanded')).toBe(expectOpen ? 'true' : 'false', expectionFailOutput);

  // Note: a more thorough check would check the below too
  // if (expectOpen) {
  //   expect(page.panelDE(panelIndex).classes['collapsed']).toBeFalsy(expectionFailOutput);
  // } else {
  //    expect(page.panelDE(panelIndex).classes['collapsed']).toBeTruthy(expectionFailOutput);
  // }
}

function getModelIndexFromPanelIndex(panelIndex: number): number {
  // find the index of model representing activity in panel 1
  const id = component._summaries[panelIndex].id;
  return activities.findIndex((activity) => activity.id === id);
}

function getActivityBackingObject(panelIndex: number): Activity {
  return activities[getModelIndexFromPanelIndex(panelIndex)];
}

class Page {
  de: DebugElement;

  get openDetailsDE(): DebugElement { return this.de.query(By.css('.card-body')); }
  /** accordion panel elements */
  // access these elements without caching since elements often refresh
  get accPanelHeaders(): DebugElement[] {
    const panelHeaderNodes = this.de.queryAll(By.css('.card-header'));
    return Array.from(panelHeaderNodes);
  }

  constructor() {
    this.de = fixture.debugElement;
  }
  panelDE(panelIndex: number): DebugElement { return this.accPanelHeaders[panelIndex].query(By.css('.btn-link')); }
  panelSummary(panelIndex: number): DetailSummary { return component._summaries[panelIndex]; }
}
