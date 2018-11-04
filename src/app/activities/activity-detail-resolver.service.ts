import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

import { Activity } from './models/activity.model';
import { MyActivitiesService } from './my-activities/my-activities.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityDetailResolverService implements Resolve<Activity> {
  constructor(
    private dataService: MyActivitiesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Activity> | Observable<never> {
    const id = route.paramMap.get('id');
    if (id === 'new') {
      return of(this.dataService.newActivity());
    }
    return this.dataService.getActivity(id).pipe(
      take(1),
      mergeMap(activity => {
        if (activity) {
          return of(activity);
        } else { // id not found
          console.log('Activity ID: ' + activity.id + ' not found.');
          this.router.navigate(['/myactivities']);
          return EMPTY;
        }
      })
    );
  }
}
