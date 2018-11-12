import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivitiesService } from '../activities.service';
import { Activity } from '../../_models/activity.model';
import { asyncData } from '../../../testing/async-observable-helpers';
import { getTestActivities } from './test-activities';
import { DetailSummary } from 'src/app/_models/detail-summary';

@Injectable({
  providedIn: 'root'
})
export class TestActivitiesService extends ActivitiesService {

  activities = getTestActivities();
  lastResult: Observable<any>; // result from last method call

  constructor() {
    super();
  }

  getSummaryList(): Observable<DetailSummary[]> {
    return asyncData<DetailSummary[]>(
      this.activities.map(
        (activity: Activity) =>
          <DetailSummary>{id: activity.id, description: activity.name}
      )
    );
  }

  getActivities(): Observable<Activity[]> {
    return this.lastResult = asyncData(this.activities);
  }

  public getActivity(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    const activity = this.activities.find(h => h.id === id);
    return this.lastResult = asyncData(activity);
  }

}
