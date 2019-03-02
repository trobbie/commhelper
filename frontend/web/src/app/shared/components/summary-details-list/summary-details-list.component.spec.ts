
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';

import { SharedModule } from '../../../shared/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { click, advance } from '../../../../testing';
import { DetailSummary } from '../../../_models/detail-summary';
import { SummaryDetailsListComponent } from './summary-details-list.component';
import { TestSummaryDetailsService } from '../../../_services/testing/test-summary-details.service';
import { TestDetails } from '../../../_models/test-details.model';
import { getTestDetails } from '../../../_services/testing/test-summary-details';

let component: SummaryDetailsListComponent;
let fixture: ComponentFixture<SummaryDetailsListComponent>;
let page: Page;

// use TestDetails to test this component
let dataService: TestSummaryDetailsService; // used for getting model data directly
let testDetails: TestDetails[];

@Component({
  selector: 'app-mock-details',
  template: '<div class="mockClass details">Mock Details</div>'
})
class MockDetailsComponent {
}

class ActivatedRouteStub {
  // expect data to be of the following shape
  data: Observable<{ summaries: DetailSummary[]}>;
  setBackingData(summariesGiven: DetailSummary[]) {
    this.data = of({ summaries: summariesGiven });
  }
}
let activatedRoute = new ActivatedRouteStub;

describe('SummaryDetailsListComponent', () => {

  beforeEach(async(() => {
    compileComponents()
    .then(createComponent);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of summaries', () => {
    expect(page.accPanelHeaders.length).toBeGreaterThan(0);
  });

  it('should initialize to no selected id in the componeent, and no expanded rows', fakeAsync(() => {
    expect(component.selectedId).toBeNull();

    page.accPanelHeaders.forEach((element) =>
      expect(element.nativeElement.querySelector('.btn-link').getAttribute('aria-expanded')).toBe('false')
    );
  }));

  it('should select entity when a closed panel is clicked', fakeAsync(() => {
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
    component.onClosePanel(getDetailsBackingObject(panelIndex).id);
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
    const currentTestDetails: TestDetails = getDetailsBackingObject(panelIndex);

    const newName = '**NAMECHANGE**';
    currentTestDetails.name = newName;
    // use test details service, not the component's summary data service
    dataService.updateEntity(currentTestDetails);

    // simulate save click by calling the event that the details component emits
    component.onClosePanel(currentTestDetails.id);
    advance(fixture);

    expect(page.panelDE(panelIndex).nativeElement.innerHTML).toContain(newName, 'summary description should now contain the new name');
  }));

  it('should always have a "new entity" panel as its first panel', fakeAsync(() => {
    expect(page.panelDE(0).nativeElement.innerHTML).toContain(component.nameOfCreateButton);
  }));

  // TODO: to test this, may need to test a host component
  xit('should show details component when "new entity" panel is selected', fakeAsync(() => {
    click(page.panelDE(0));
    advance(fixture);

    expect(page.openDetailsDE).not.toBeNull('could not find opened panel body');
    if (page.openDetailsDE) {
      const detailsDE = page.openDetailsDE.query(By.css('.mockClass'));
      expect(detailsDE).not.toBeNull('could not find mockClass class');
    }
  }));

  it('should add "new entity" to panel 1 position after saving', fakeAsync(() => {
    click(page.panelDE(0));
    advance(fixture);

    const newEntity: TestDetails = new TestDetails();
    newEntity.id = 99999;
    newEntity.name = 'testing';
    newEntity.dateCreated = new Date();
    dataService.addEntity(newEntity);

    // simulate save click by calling the event that the details component emits
    component.onClosePanel(newEntity.id);
    advance(fixture);

    expect(page.panelSummary(1).id).toBe(newEntity.id, 'panel 1 does not contain new entity');

  }));

});

/////////// Helpers /////

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
  // find the index of model representing entity in panel 1
  const id = component._summaries[panelIndex].id;
  return testDetails.findIndex((entity) => entity.id === id);
}

function getDetailsBackingObject(panelIndex: number): TestDetails {
  return testDetails[getModelIndexFromPanelIndex(panelIndex)];
}

/////////// Helpers /////
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

function compileComponents() {
  return TestBed.configureTestingModule({
    imports: [
      SharedModule,
      ReactiveFormsModule,
      AppRoutingModule
    ],
    declarations: [
      MockDetailsComponent
    ],
    providers: [
      { provide: ActivatedRoute, useValue: activatedRoute }
    ]
  })
  .compileComponents();
}

function createComponent() {
  fixture = TestBed.createComponent(SummaryDetailsListComponent);
  component = fixture.componentInstance;
  dataService = new TestSummaryDetailsService;
  component.dataService = dataService; // for assigning summary data service
  testDetails = getTestDetails();
  activatedRoute = TestBed.get(ActivatedRoute); // get injected
  // calculate DetailSummary from test data
  activatedRoute.setBackingData(
    testDetails.map(
      (details: TestDetails) => <DetailSummary>{
        id: details.id,
        description: details.name,
        dateCreated: details.dateCreated
      }
  ));

  // change detection triggers ngOnInit
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the model data and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

