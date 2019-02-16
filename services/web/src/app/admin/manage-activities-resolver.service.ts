import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ActivitiesService } from '../_services/activities.service';
import { DetailSummary } from '../_models/detail-summary';

@Injectable({
  providedIn: 'root'
})
export class ManageActivitiesResolverService implements Resolve<DetailSummary[]> {

  constructor(
    private _dataService: ActivitiesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailSummary[]> | Observable<never> {
    return this._dataService.getSummaryList().pipe(
      switchMap((summaries) => {
        return of(summaries);
      })
    );
  }
}

