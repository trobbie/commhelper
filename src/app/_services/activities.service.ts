import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/internal/operators';

import { Activity } from '../_models/activity.model';
import { ACTIVITIES } from '../_mocks/mock-activities';
import { DetailSummary } from '../_models/detail-summary';
import { SummaryDetailsService } from './summary-details-service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService implements SummaryDetailsService {
  activitiesUrl = environment.apiUrl + '/activities';
  // TODO: determine how and when to use the cache (and add refresh button?)
  activities: Activity[];  // cache

  private debugDelay = 0;  // adds delay to async calls, use 0 for none

  constructor(private http: HttpClient) {
    // this.activities = null; // ACTIVITIES;
  }

  convertActivityToDetailSummary(activity: Activity): DetailSummary {
    return <DetailSummary>{
      id: activity.id,
      description: activity.name,
      dateCreated: activity.dateCreated
    };
  }

  getSummaryList(): Observable<DetailSummary[]> {
    return this.getActivities().pipe(
      map(
        (activities: Activity[]) =>
          activities.map((activity: Activity) =>
              this.convertActivityToDetailSummary(activity)
          )
      ),
      delay(this.debugDelay)
    );
  }

  getSummary(id: number): Observable<DetailSummary> {
    return this.getActivity(id).pipe(
      map((activity: Activity) =>
        this.convertActivityToDetailSummary(activity)
      ),
      delay(this.debugDelay)
    );
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitiesUrl)
      .pipe(
        tap((activities: Activity[]) => {
          this.activities = activities;  // cache result
        }),
        delay(this.debugDelay)
      );
  }

  getActivity(id: number | string): Observable<Activity> {
    return this.http.get<Activity>(this.activitiesUrl + '\\' + id).pipe(
      delay(this.debugDelay)
    );
  }

  updateActivity(updatedActivity: Activity): Observable<Activity> {
    if (!updatedActivity.id || updatedActivity.id === 0) {
      throw new Error('Use addActivity() for new activities, not updateActivity()');
    }

    return this.http.put<Activity>(this.activitiesUrl + '\\' + updatedActivity.id, updatedActivity)
      .pipe(
        tap((activity) => {
          // update cache
          const index = this.activities.findIndex((a) => a.id === activity.id);
          this.activities[index] = activity;
        }),
        delay(this.debugDelay)
      );

  }

  // addActivity inserts the newActivity into the database.
  // newActivity.id (ignored as input paramter) is assigned by the database
  addActivity(newActivity: Activity): Observable<Activity> {
    // for now, add to our Activities array

    // TODO: the database backing the web service should assign the id
    newActivity.id =
      this.activities.reduce((max, p) => p.id > max ? p.id : max,
        this.activities[0].id)
      + 1; // id is max id + 1
    newActivity.dateCreated = new Date();

    return this.http.post<Activity>(this.activitiesUrl, newActivity)
      .pipe(
        tap((activity) => {
          this.activities.push(newActivity);
        }),
        delay(this.debugDelay)
      );
  }

  // newActivity creates a skeleton object, synchronous
  // newActivity does NOT alter the database
  newActivity(): Activity {
    const activity: Activity = new Activity();
    activity.id = 0;
    activity.name = '';
    activity.dateCreated = null;
    return activity;
  }

}
