import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Activity } from '../models/activity.model';
import { MyActivitiesService } from './my-activities.service';

@Component({
  selector: 'app-myactivities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  myActivities: Activity[];
  selectedActivity: Activity;

  constructor(private myActivitiesService: MyActivitiesService) { }

  ngOnInit() {
    this.getMyactivities();
  }

  getMyactivities(): void {
    this.myActivitiesService.getMyActivities()
      .subscribe(myactivities => this.myActivities = myactivities);
  }

  onSelect(activity: Activity): void {
    this.selectedActivity = activity;
  }

}
