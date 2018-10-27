import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Activity } from '../models/activity.model';
import { MYACTIVITIES } from '../mocks/mock-my-activities';

@Injectable({
  providedIn: 'root'
})
export class MyActivitiesService {

  constructor() { }

  getMyActivities(): Observable<Activity[]> {
    return of(MYACTIVITIES);
  }
}