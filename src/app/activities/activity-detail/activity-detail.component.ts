import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Activity } from '../models/activity.model';
import { MyActivitiesService } from '../my-activities/my-activities.service';
import { DialogService } from '../../_services/dialog.service';

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
    private activityService: MyActivitiesService,
    private dialogService: DialogService
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

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.activity || !this.isDataChanged()) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  private isDataChanged(): boolean {
    return !(this.activity.name === this.editName);
  }

  gotoActivities(activityToSelect?: Activity) {
    const activityId = activityToSelect ? activityToSelect.id : null;
    this.router.navigate( ['/myactivities', { id: activityId }]);
  }

  save() {
    this.activity.name = this.editName;

    if (this.activity.id == null) {
      this.activityService.addActivity(this.activity);
    }

    this.gotoActivities();
  }

  cancel() {
    this.gotoActivities();
  }
}
