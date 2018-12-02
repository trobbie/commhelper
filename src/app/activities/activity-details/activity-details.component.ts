import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ActivitiesService } from '../../_services/activities.service';
import { SummaryDetailsListComponent } from '../../shared/components/summary-details-list/summary-details-list.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  activityId: number = null;
  initializing = false;

  activityForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    dateCreated: [null]
  });

  constructor(
    private fb: FormBuilder,
    private dataService: ActivitiesService,
    public listComponent: SummaryDetailsListComponent
  ) {}

  // the details component is only initialized once
  //   since using content projection
  ngOnInit() {
    this.setEntityId(this.activityId);
    // register this details component with the host listComponent
    this.listComponent.detailsComponent = this;

    this.activityForm.valueChanges.subscribe(val => {
      // do not emit changes while initializing form
      if (!this.initializing) {
        this.informHostOfDataChanges();
      }
    });
  }

  informHostOfDataChanges() {
    this.listComponent.onValuesChanged(true);
  }

  setEntityId(id: number | null): void {
    if (id === null) {
      this.activityId = null;
      return;
    }

    // while setting the activity, keep the activityId = null until
    //   form changes are made, else will emit a "change" event
    this.activityId = null;
    this.initializing = true;
    // TODO: why must I reset() so that form isn't dirty even after setValue()?
    this.activityForm.reset();
    if (id === 0) { // then a "new activity"
      const activity = this.dataService.newActivity();
      // note: activity not added to dataService yet
      this.activityId = 0;
      this.activityForm.setValue(activity);
      this.initializing = false;
    } else {
      this.dataService.getActivity(id).subscribe(
        (activity) => {
          this.activityId = id;
          this.activityForm.setValue(activity);
          this.initializing = false;
        }
      );
    }
  }

  isDataChanged(): boolean {
    return this.activityForm ? this.activityForm.dirty : false;
  }

  isSaveButtonDisabled(): boolean {
     return !this.activityForm.valid || !this.activityForm.dirty;
  }

  isCancelButtonDisabled(): boolean {
    return !this.activityForm.dirty && (this.activityId !== 0);
  }

  // onSubmit() (called from ngSubmit directive) - when user presses 'enter'
  onSubmit() {
     if (this.activityForm.valid) {
      this.save();
    }
  }

  save() {
    if (this.activityForm.value.id) {
      this.dataService.updateActivity(this.activityForm.value).subscribe(
        (updatedActivity) =>
          this.listComponent.onClosePanel(this.activityForm.value.id)
      );
    } else {
      // else was a new activity, now add to the dataService
      this.dataService.addActivity(this.activityForm.value).forEach(
        (newActivity) => {
          this.listComponent.onClosePanel(newActivity.id);
        }
      );
    }
  }

  cancel() {
    this.activityForm.reset();
    this.listComponent.onClosePanel(null);
  }

}
