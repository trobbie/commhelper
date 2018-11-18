import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ActivitiesService } from '../../_services/activities.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  activityId: number = null;
  @Output() closePanelFromDetails = new EventEmitter<number|null>();
  @Output() valueChangedFromDetails = new EventEmitter<boolean>();
  initializing = false;
  activityForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    dateCreated: [null]
  });

  constructor(
    private fb: FormBuilder,
    private dataService: ActivitiesService
  ) {}

  // the details component is only initialized once
  ngOnInit() {
    this.setActivity(this.activityId);
    this.activityForm.valueChanges.subscribe(val => {
      // do not emit changes while initializing form
      if (!this.initializing) {
      // if (this.activityId !== null) {
        this.valueChangedFromDetails.emit(true);
      }
    });
  }

  setActivity(id: number | null): void {
    if (id === null) {
      this.activityId = null;
      return;
    }

    // while setting the activity, keep the activityId = null until
    //   form changes are made, else will emit a "change" event
    // this.activityId = null;
    this.initializing = true;
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
    return !this.activityForm.dirty;
  }

  // onSubmit() (called from ngSubmit directive) - when user presses 'enter'
  onSubmit() {
     if (this.activityForm.valid) {
      this.save();
    }
  }

  save() {
    if (this.activityForm.value.id) {
      this.dataService.updateActivity(this.activityForm.value);
      this.closePanelFromDetails.emit(this.activityForm.value.id);
    } else {
      // else was a new activity, now add to the dataService
      this.dataService.addActivity(this.activityForm.value).forEach(
        (newActivity) => {
          this.closePanelFromDetails.emit(newActivity.id);
        }
      );
    }
  }

  cancel() {
    this.activityForm.reset();
    this.closePanelFromDetails.emit(null);
  }

}
