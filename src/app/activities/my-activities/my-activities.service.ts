import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Activity } from '../models/activity.model';
import { MYACTIVITIES } from '../mocks/mock-my-activities';

@Injectable({
  providedIn: 'root'
})
export class MyActivitiesService {

  activities: Activity[];

  constructor() {
    this.activities = MYACTIVITIES;
  }

  getMyActivities(): Observable<Activity[]> {
    return of(this.activities);
  }

  addActivity(newActivity: Activity) {
    // note: ignoring the id of this newActivity (assigned by source instead)
    newActivity.id = null;
    this.activities.concat(newActivity);
  }


}
