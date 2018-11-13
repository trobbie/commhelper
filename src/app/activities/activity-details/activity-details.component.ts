import { Component, OnInit, Optional, Input, Output, EventEmitter } from '@angular/core';

import { ActivitiesListComponent } from '../activities-list/activities-list.component';
import { ActivitiesService } from '../../_services/activities.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  @Input() activityId: number;
  @Output() closePanelFromDetails = new EventEmitter<boolean>();
  @Output() valueChangedFromDetails = new EventEmitter<boolean>();

  activityForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    dateCreated: ['']
  });

  constructor(
    private fb: FormBuilder,
    private dataService: ActivitiesService,
    @Optional() public listComponent: ActivitiesListComponent
  ) {}

  ngOnInit() {
    this.dataService.getActivity(this.activityId).subscribe(
      activity => {
        this.activityForm.setValue(activity);
      }
    );
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
    // console.log('save:' + JSON.stringify(this.activityForm.value));
    this.dataService.updateActivity(this.activityForm.value);

    if (this.activityForm['id'] === null
        || this.activityForm['id'] === 0) {
      console.log('adding new activity:' + this.activityForm['id']);
      this.dataService.addActivity(this.activityForm.value);
    }

    this.closePanelFromDetails.emit(true);
  }

  cancel() {
    this.activityForm.reset();
    this.closePanelFromDetails.emit(true);
  }

}
