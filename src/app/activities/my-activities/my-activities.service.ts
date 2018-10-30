import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Activity } from '../models/activity.model';
import { MYACTIVITIES } from '../mocks/mock-my-activities';

@Injectable({
  providedIn: 'root'
})
export class MyActivitiesService {

  activities: Activity[];

  constructor() {
    // initialize activities
    this.activities = MYACTIVITIES;
  }

  getActivities(): Observable<Activity[]> {
    return of(this.activities);
  }

  getActivity(id: number | string) {
    return this.getActivities().pipe(
      map((activities: Activity[]) => activities.find(activity => activity.id === +id))
    );
  }

  // addActivity inserts the newActivity into the database.
  // newActivity.id (ignored as input paramter) is assigned by the database
  addActivity(newActivity: Activity) {
    // for now, add to our Activities array
    newActivity.id =
      this.activities.reduce((max, p) => p.id > max ? p.id : max,
        this.activities[0].id)
      + 1; // increase max value by one

    this.activities.push(newActivity);
  }

  // newActivity creates a skeleton object
  // newActivity does NOT alter the database
  newActivity(): Activity {
    const activity: Activity = new Activity;
    activity.id = null;
    return activity;
  }

}
