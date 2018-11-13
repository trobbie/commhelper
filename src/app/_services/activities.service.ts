import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Activity } from '../_models/activity.model';
import { ACTIVITIES } from '../_mocks/mock-activities';
import { DetailSummary } from '../_models/detail-summary';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  activities: Activity[];

  constructor() {
    // initialize activities
    this.activities = ACTIVITIES;
  }

  getSummaryList(): Observable<DetailSummary[]> {
    return of(this.activities.map(
      (activity: Activity) =>
        <DetailSummary>{
          id: activity.id,
          description: activity.name,
          dateCreated: activity.dateCreated
        }
      ));
  }

  getActivities(): Observable<Activity[]> {
    return of(this.activities);
  }

  getActivity(id: number | string): Observable<Activity> {
    return this.getActivities().pipe(
      map((activities: Activity[]) => activities.find(activity => activity.id === +id))
    );
  }

  updateActivity(activity: Activity): boolean {
    if (!activity.id || activity.id === 0) {
      throw new Error('Use addActivity() for new activities, not updateActivity()');
    }
    const index = this.activities.findIndex((a) => a.id === activity.id);
    this.activities[index] = activity;
    return true;
  }

  // addActivity inserts the newActivity into the database.
  // newActivity.id (ignored as input paramter) is assigned by the database
  addActivity(newActivity: Activity) {
    // for now, add to our Activities array
    newActivity.id =
      this.activities.reduce((max, p) => p.id > max ? p.id : max,
        this.activities[0].id)
      + 1; // increase max value by one
      newActivity.dateCreated = new Date();
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
