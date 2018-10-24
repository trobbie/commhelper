import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Activity } from '../models/activity.model';
import { MYACTIVITIES } from '../mocks/mock-myactivities';

@Injectable({
  providedIn: 'root'
})
export class MyactivitiesService {

  constructor() { }

  getMyactivities(): Observable<Activity[]> {
    return of(MYACTIVITIES);
  }
}
