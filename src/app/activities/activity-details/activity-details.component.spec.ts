import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ActivityDetailsComponent } from './activity-details.component';
import { SharedModule } from '../../shared/shared.module';
import { Activity } from '../../_models/activity.model';
import { newEvent, click, advance } from '../../../testing';
import { ActivitiesService } from '../../_services/activities.service';


let component: ActivityDetailsComponent;
let fixture: ComponentFixture<ActivityDetailsComponent>;
let page: Page;
let dataService: ActivitiesServiceStub;

const testActivity: Activity = {
  id: 42,
  name: 'TestActivity42',
  dateCreated: new Date('2018-10-01T01:00:00')
};

class ActivitiesServiceStub {
  getActivity() {
    return of(testActivity);
  }
  updateActivity() {
    return; // do nothing
  }
  addActivity() {
    return of({id: 99999, description: '' });
  }
}

describe('ActivityDetailsComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityDetailsComponent
      ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ActivitiesService, useClass: ActivitiesServiceStub }
      ]
    })
    .compileComponents();
  }));

  // the "sync" beforeEach is guaranteed to run after the "async" one
  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // xit('should have called `getActivity`', () => {
  //   expect(dataService.getActivity.calls.count()).toBe(1, 'getActivity called once');
  // });

  it('should disable save/cancel buttons upon initially opening panel', () => {
    expect(page.buttonSave.hasAttribute('disabled')).toBe(true, 'save button not disabled');
    expect(page.buttonCancel.hasAttribute('disabled')).toBe(true, 'cancel button not disabled');
  });

  it('should fill in the fields correctly from dataService', () => {
    expect(page.idField.textContent).toBe(testActivity.id.toString(), 'id incorrect');
    expect(page.nameField.value).toBe(testActivity.name, 'name incorrect');
  });

  it('should emit an event on closePanelFromDetails when cancel button is clicked', fakeAsync(() => {
    let emitted = false;
    component.closePanelFromDetails.subscribe(() => emitted = true);

    // change a value so that the cancel button is enabled for clicking
    page.nameField.value = page.nameField.value + 's';
    page.nameField.dispatchEvent(newEvent('input'));
    advance(fixture);

    expect(emitted).toBe(false, 'event should not have emitted yet');
    expect(page.buttonCancel.hasAttribute('disabled')).toBe(false, 'cancel button still not enabled for clicking');

    click(page.buttonCancel);
    expect(emitted).toBe(true, 'event did not emit upon clicking cancel');

    component.closePanelFromDetails.unsubscribe();
  }));

  it('should emit an event on closePanelFromDetails when save button is clicked', fakeAsync(() => {
    let emitted = false;
    component.closePanelFromDetails.subscribe((activity) => emitted = true);

    // change a value so that the cancel button is enabled for clicking
    page.nameField.value = page.nameField.value + 's';
    page.nameField.dispatchEvent(newEvent('input'));
    advance(fixture);

    expect(emitted).toBe(false, 'event should not have emitted yet');
    expect(page.buttonSave.hasAttribute('disabled')).toBe(false, 'save button still not enabled for clicking');

    click(page.buttonSave);
    advance(fixture);
    expect(emitted).toBe(true, 'event did not emit upon clicking save');

    component.closePanelFromDetails.unsubscribe();
  }));

  it('should enable save/cancel button and emit on valueChangedFromDetails, when data changes and is valid', fakeAsync(() => {
    expect(page.buttonCancel.hasAttribute('disabled')).toBe(true, 'cancel button not initially disabled');
    expect(page.buttonSave.hasAttribute('disabled')).toBe(true, 'save button not initially disabled');

    let emitted = false;
    component.valueChangedFromDetails.subscribe(() => emitted = true);
    expect(emitted).toBe(false, 'event should not have emitted yet');

    page.nameField.value = page.nameField.value + 's';
    page.nameField.dispatchEvent(newEvent('input'));
    advance(fixture); // update the display binding
    // fixture.detectChanges(); // update the display binding

    expect(component.activityForm.valid).toBe(true, 'invalid form change; CHANGE TEST');

    expect(page.buttonSave.hasAttribute('disabled')).toBe(false, 'save button not enabled');
    expect(page.buttonCancel.hasAttribute('disabled')).toBe(false, 'cancel button not enabled');
    expect(emitted).toBe(true, 'event never emitted');

    component.closePanelFromDetails.unsubscribe();
  }));

  it('should disable save button if name (required) not specified', () => {

    page.nameField.value = ''; // thus should make FormGroup invalid
    page.nameField.dispatchEvent(newEvent('input'));
    fixture.detectChanges(); // update the display binding

    expect(page.buttonSave.hasAttribute('disabled')).toBe(true, 'save button not disabled');
  });

});

/////////// Helpers /////

function createComponent() {
  fixture = TestBed.createComponent(ActivityDetailsComponent);
  component = fixture.componentInstance;
  dataService = fixture.debugElement.injector.get(ActivitiesService) as any;

  // set those properties that would have been set by parent
  component.activityId = testActivity.id;

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
  get idField() { return this.query<HTMLElement>('span.idField'); }
  get nameField() { return this.query<HTMLInputElement>('input#nameField'); }
  get buttonSave() { return this.query<HTMLButtonElement>('.buttonSave'); }
  get buttonCancel() { return this.query<HTMLButtonElement>('.buttonCancel'); }

  constructor() {
  }
  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}
