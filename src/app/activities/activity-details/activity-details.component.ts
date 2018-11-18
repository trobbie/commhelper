import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ActivitiesService } from '../../_services/activities.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  @Input() activityId: number;
  @Output() closePanelFromDetails = new EventEmitter<number|null>();
  @Output() valueChangedFromDetails = new EventEmitter<boolean>();

  activityForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    dateCreated: ['']
  });

  constructor(
    private fb: FormBuilder,
    private dataService: ActivitiesService
  ) {}

  ngOnInit() {
    if (this.activityId === 0) { // then a "new activity"
      const activity = this.dataService.newActivity();
      // note: activity not added to dataService yet
      this.activityForm.setValue(activity);
    } else {
      this.dataService.getActivity(this.activityId).subscribe(
        (activity) => {
          this.activityForm.setValue(activity);
        }
      );
    }
    this.onChanges();
  }

  onChanges(): void {
    this.activityForm.valueChanges.subscribe(val => {
      this.valueChangedFromDetails.emit(true);
    });
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
    if (this.activityForm['id']) {
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
