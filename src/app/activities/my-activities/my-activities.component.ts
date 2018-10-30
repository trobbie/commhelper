import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Activity } from '../models/activity.model';
import { MyActivitiesService } from './my-activities.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myactivities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  myActivities$: Observable<Activity[]>;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myActivitiesService: MyActivitiesService
  ) { }

  ngOnInit() {
    this.getAllActivities();
  }

  getAllActivities() {
    this.myActivities$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectId(+params.get('id'));
        return this.myActivitiesService.getActivities();
      })
    );
  }

  selectId(id: number): void {
    this.selectedId = id;
  }

  onSelect(activity: Activity): void {
    this.selectId(activity.id);
  }

  onCreateNewActivity(): void {
    this.selectedId = null;
    this.router.navigate(['/myactivities/new']);
  }

}
