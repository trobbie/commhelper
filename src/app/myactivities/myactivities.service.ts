import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Activity } from '../shared/models/activity.model';
import { MYACTIVITIES } from '../shared/mocks/mock-myactivities';

@Injectable({
  providedIn: 'root'
})
export class MyactivitiesService {

  constructor() { }

  getMyactivities(): Observable<Activity[]> {
    return of(MYACTIVITIES);
  }
}
