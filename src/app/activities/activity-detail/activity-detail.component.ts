import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Activity } from '../models/activity.model';
import { MyActivitiesService } from '../my-activities/my-activities.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  @Input() activity: Activity;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: MyActivitiesService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { activity: Activity }) => {
        if (data.activity) {
          this.editName = data.activity.name;
        } else {
          this.editName = null;
        }
        this.activity = data.activity;
      });
  }

  gotoActivities(activityToSelect: Activity) {
    const activityId = activityToSelect ? activityToSelect.id : null;
    this.router.navigate( ['/myactivities'] );
  }

  save() {
    this.activity.name = this.editName;

    if (this.activity.id == null) {
      this.activityService.addActivity(this.activity);
    }

    this.gotoActivities(this.activity);
  }

  cancel() {
    this.gotoActivities(this.activity);
  }
}
