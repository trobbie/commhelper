import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { Activity } from '../../_models/activity.model';
import { ActivitiesService } from '../../_services/activities.service';

@Component({
  selector: 'app-myactivities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        width: 200,
        transform: 'translateX(0)', opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 200
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
  })
export class MyActivitiesComponent implements OnInit {

  myActivities$: Observable<Activity[]>;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myActivitiesService: ActivitiesService
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
