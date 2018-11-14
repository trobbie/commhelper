import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input, EventEmitter, Output, getDebugNode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivitiesListComponent } from './activities-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ActivitiesService } from '../../_services/activities.service';
import { TestActivitiesService } from '../../_services/testing/test-activities.service';
import { getTestActivities } from '../../_services/testing/test-activities';
import { click, advance } from '../../../testing';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';

const ACTIVITIES = getTestActivities();

let component: ActivitiesListComponent;
let fixture: ComponentFixture<ActivitiesListComponent>;
let page: Page;

@Component({selector: 'app-activity-details', template: ''})
class ActivityDetailsStubComponent {
  // mimic the public API
  @Input() activityId: number;
  @Output() closePanelFromDetails = new EventEmitter<boolean>();
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
    expect(component.getSelectedId()).toBeNull();

    page.accPanelHeaders.forEach((element) =>
      expect(element.nativeElement.querySelector('.btn-link').getAttribute('aria-expanded')).toBe('false')
    );
  }));

  it('should select activity when a closed panel is clicked', fakeAsync(() => {
    const expectedActivity = ACTIVITIES[ACTIVITIES.length - 2];
    const header = page.accPanelHeaders[1];
    const clickablePortion: DebugElement = header.query(By.css('.btn-link'));

    expect(clickablePortion.nativeElement.getAttribute('class').includes('collapsed')).toBeTruthy('row should be initially collapsed');
    expect(component.getSelectedId()).toBeNull('component selected id should initially be null');

    click(clickablePortion);
    advance(fixture);

    expect(component.getSelectedId()).toEqual(expectedActivity.id, 'component selected id should be property assigned');
  }));

  // enable when can get isDataChanged() to work when adding FormGroup
  it('should open up panel if a panel row is clicked; all others closed', fakeAsync(() => {

    expect(page.panel1DE.nativeElement.classList.contains('collapsed')).toBeTruthy('row should be initially collapsed');

    click(page.panel1DE);
    advance(fixture);

    // Note: when panel is row is expanded, can also check 'aria-expanded'
    expect(page.panel1DE.nativeElement.getAttribute('aria-expanded')).toBe('true', 'row is not initially collapsed');
    expect(page.panel1DE.nativeElement.classList.contains('collapsed')).toBeFalsy('first clicked row should be expanded');

    // NOW click _another_ row and see the effects
    click(page.panel2DE);
    advance(fixture);

    expect(page.panel2DE.nativeElement.getAttribute('aria-expanded')).toBe('true', 'clicked row should be expanded');
    expect(page.panel2DE.classes['collapsed']).toBeFalsy('clicked row should be expanded');

    expect(page.panel1DE.nativeElement.getAttribute('aria-expanded')).toBe('false', 'prior expanded row should be collapsed');
    expect(page.panel1DE.classes['collapsed']).toBeTruthy('prior expanded row should be collapsed');

  }));

  it('should disable all other panel rows when data has been changed for a selection', fakeAsync(() => {
    expect(page.panel2DE.nativeElement.hasAttribute('disabled')).toBe(false, 'initially not disabled');

    click(page.panel1DE);
    advance(fixture);

    // simulate data change by calling the event that the details component emits
    component.onValuesChanged(true);
    advance(fixture);

    expect(page.panel2DE.nativeElement.hasAttribute('disabled')).toBe(true, 'onValuesChanged() did not disable panel');
  }));

  it('should close panel when onClosePanel() is called', fakeAsync(() => {
    click(page.panel1DE);
    advance(fixture);

    expect(page.panel1DE.nativeElement.getAttribute('aria-expanded')).toBe('true', 'panel expected to be open at first click');

    // simulate cancel/save click by calling the event that the details component emits
    component.onClosePanel(true);

    // expect(component.getSummaryList).toHaveBeenCalledWith();
    advance(fixture);

    expect(component.getSelectedId()).toBeNull('selectedId not set to null upon onClosePanel()');
    expect(page.panel1DE.nativeElement.getAttribute('aria-expanded')).toBe('false', 'onClosePanel() did not collapse panel');
    expect(page.panel1DE.classes['collapsed']).toBeTruthy('onClosePanel() did not collapse panel');

  }));


});

/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(ActivitiesListComponent);
  component = fixture.componentInstance;

  // change detection triggers ngOnInit
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the activities and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  de: DebugElement;
  /** accordion panel elements */
  accPanelHeaders: DebugElement[];

  get panel1DE(): DebugElement { return this.accPanelHeaders[1].query(By.css('.btn-link')); }
  get panel2DE(): DebugElement { return this.accPanelHeaders[2].query(By.css('.btn-link')); }

  constructor() {
    this.de = fixture.debugElement;
    const panelHeaderNodes = fixture.debugElement.queryAll(By.css('.card-header'));
    this.accPanelHeaders = Array.from(panelHeaderNodes);
  }
}
