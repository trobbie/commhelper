import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActivitiesListComponent } from './activities-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ActivitiesService } from '../../_services/activities.service';
import { TestActivitiesService } from '../../_services/testing/test-activities.service';
import { getTestActivities } from '../../_services/testing/test-activities';
import { click, advance } from '../../../testing';
import { ReactiveFormsModule } from '@angular/forms';


const ACTIVITIES = getTestActivities();

let component: ActivitiesListComponent;
let fixture: ComponentFixture<ActivitiesListComponent>;
let page: Page;

describe('ActivitiesListComponent', () => {

  beforeEach(async(() => {
    // addMatchers();

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      declarations: [
        ActivitiesListComponent,
        ActivityDetailsComponent
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
    const expectedActivity = ACTIVITIES[1];
    const header = page.accPanelHeaders[1];
    const clickablePortion: DebugElement = header.query(By.css('.btn-link'));

    expect(clickablePortion.nativeElement.getAttribute('class').includes('collapsed')).toBeTruthy('row should be initially collapsed');
    expect(component.getSelectedId()).toBeNull('component selected id should initially be null');

    click(clickablePortion);
    advance(fixture);

    expect(component.getSelectedId()).toEqual(expectedActivity.id, 'component selected id should be property assigned');
  }));

  // enable when can get isDataChanged() to work when adding FormGroup
  xit('should open up panel if a panel row is clicked; all others closed', fakeAsync(() => {
    const button1: DebugElement = page.accPanelHeaders[1].query(By.css('.btn-link'));
    const button2: DebugElement = page.accPanelHeaders[2].query(By.css('.btn-link'));

    expect(button1.nativeElement.classList.contains('collapsed')).toBeTruthy('row should be initially collapsed');

    click(button1);
    advance(fixture);

    // Note: when panel is row is expanded, can also check 'aria-expanded'
    // 'aria-expanded': I assume "aria" refers to "area"
    // expect(button1.getAttribute('aria-expanded')).toBe('false', 'row is not initially collapsed');
    expect(button1.nativeElement.classList.contains('collapsed')).toBeFalsy('first clicked row should be expanded');

    // NOW click _another_ row and see the effects
    click(button2);
    advance(fixture);

    // expect(button2.getAttribute('aria-expanded')).toBe('true', 'clicked row not expanded');
    expect(button2.classes['collapsed']).toBeFalsy('clicked row should be expanded');
    // expect(button2.nativeElement.classList.contains('collapsed')).toBeFalsy('clicked row should be expanded');

    // expect(button1.getAttribute('aria-expanded')).toBe('false', 'prior expanded row not collapsed');
    expect(button1.classes['collapsed']).toBeTruthy('prior expanded row should be collapsed');
    // expect(button1.nativeElement.classList.contains('collapsed')).toBeTruthy('prior expanded row should be collapsed');
  }));

  xit('should disable all other panel rows when data has been changed for a selection', () => {

  });

  xit('should enable save/cancel buttons upon changing data in a selection', () => {

  });

  it('should close panel when details cancel button is clicked', () => {
  });


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
  /** accordion panel elements */
  accPanelHeaders: DebugElement[];
  accPanelRows: HTMLElement[];

  /** Highlighted DebugElement */
  // highlightDe: DebugElement;

  constructor() {
    // const panelHeaderNodes = fixture.nativeElement.querySelectorAll('.card-header');
    const panelHeaderNodes = fixture.debugElement.queryAll(By.css('.card-header'));
    this.accPanelHeaders = Array.from(panelHeaderNodes);
    const panelNodes = fixture.nativeElement.querySelectorAll('.card');
    this.accPanelRows = Array.from(panelNodes);

    // Find the first element with an attached HighlightDirective
    // this.highlightDe = fixture.debugElement.query(By.directive(HighlightDirective));

  }
}
