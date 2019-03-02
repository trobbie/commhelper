import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { asyncData } from '../../../testing/async-observable-helpers';
import { DetailSummary } from '../../_models/detail-summary';
import { SummaryDetailsService } from '../summary-details-service';
import { getTestDetails } from './test-summary-details';
import { TestDetails } from '../../_models/test-details.model';

@Injectable({
  providedIn: 'root'
})
export class TestSummaryDetailsService implements SummaryDetailsService {

  testdetails = getTestDetails();
  lastResult: Observable<any>; // result from last method call

  constructor() {}

  getSummaryList(): Observable<DetailSummary[]> {
    return asyncData<DetailSummary[]>(
      this.testdetails.map(
        (details: TestDetails) => <DetailSummary>{
          id: details.id,
          description: details.name,
          dateCreated: details.dateCreated
        }
      )
    );
  }

  getSummary(id: number): Observable<DetailSummary> {
    return of(this.testdetails
      .filter((details) => details.id === id)
      .map((details: TestDetails) => <DetailSummary>{
        id: details.id,
        description: details.name,
        dateCreated: details.dateCreated
      })[0]);
  }

  getEntities(): Observable<TestDetails[]> {
    return this.lastResult = asyncData(this.testdetails);
  }

  getEntity(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    const details = this.testdetails.find(h => h.id === id);
    return this.lastResult = asyncData(details);
  }

  updateEntity(details: TestDetails): boolean {
    if (!details.id || details.id === 0) {
      throw new Error('Use addEntity() for new entity, not updateEntity()');
    }
    const index = this.testdetails.findIndex((a) => a.id === details.id);
    this.testdetails[index] = details;
    return true;
  }

  addEntity(newEntity: TestDetails): Observable<TestDetails> {
    // for now, add to our TestDetails array

    newEntity.id =
      this.testdetails.reduce((max, p) => p.id > max ? p.id : max,
        this.testdetails[0].id)
      + 1; // id is max id + 1
      newEntity.dateCreated = new Date();
    this.testdetails.push(newEntity);
    return of(newEntity);
  }
}
