import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ActivitiesService } from '../activities.service';
import { Activity } from '../../_models/activity.model';
import { asyncData } from '../../../testing/async-observable-helpers';
import { getTestActivities } from './test-activities';
import { DetailSummary } from '../../_models/detail-summary';
import { SummaryDetailsService } from '../summary-details-service';

@Injectable({
  providedIn: 'root'
})
export class TestActivitiesService implements SummaryDetailsService {

  activities = getTestActivities();
  lastResult: Observable<any>; // result from last method call

  constructor() {
  }

  getSummaryList(): Observable<DetailSummary[]> {
    return asyncData<DetailSummary[]>(
      this.activities.map(
        (activity: Activity) =>
          <DetailSummary>{id: activity.id, description: activity.name, dateCreated: activity.dateCreated}
      )
    );
  }

  getSummary(id: number): Observable<DetailSummary> {
      return of(this.activities
          .filter((activity) => activity.id === id)
          .map((activity: Activity) =>
            <DetailSummary>{
              id: activity.id,
              description: activity.name,
              dateCreated: activity.dateCreated
            }
          )[0]);
  }

  getActivities(): Observable<Activity[]> {
    return this.lastResult = asyncData(this.activities);
  }

  getActivity(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    const activity = this.activities.find(h => h.id === id);
    return this.lastResult = asyncData(activity);
  }

  updateActivity(activity: Activity): Observable<Activity> {
    if (!activity.id || activity.id === 0) {
      throw new Error('Use addActivity() for new activities, not updateActivity()');
    }
    const index = this.activities.findIndex((a) => a.id === activity.id);
    this.activities[index] = activity;
    return asyncData(activity);
  }

}
