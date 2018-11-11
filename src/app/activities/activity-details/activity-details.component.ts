import { Component, OnInit, Optional, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';

import { ActivitiesListComponent } from '../activities-list/activities-list.component';
import { ActivitiesService } from '../../_services/activities.service';
import { Activity } from '../../_models/activity.model';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  @Input() activity: Activity;
  activity$: Observable<Activity>;
  editName: string;
  @Input() activityId: number;
  @Output() closePanelFromDetails = new EventEmitter<boolean>();

  constructor(
    @Optional() public listComponent: ActivitiesListComponent,
    private dataService: ActivitiesService
  ) {}

  ngOnInit() {
    this.dataService.getActivity(this.activityId).subscribe(
      activity => {
        this.editName = activity.name;
        this.activity = activity;
      }
    );
  }

  isDataChanged(): boolean {
    if (this.activity) {
      return false;
    } else {
      return !(this.activity.name === this.editName);
    }
  }

  save() {
    this.activity.name = this.editName;

    if (this.activity.id == null) {
      this.dataService.addActivity(this.activity);
    }

    this.closePanelFromDetails.emit(true);
  }

  cancel() {
    this.closePanelFromDetails.emit(true);
  }

}
