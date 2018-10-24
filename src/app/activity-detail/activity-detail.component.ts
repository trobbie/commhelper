import { Component, OnInit, Input } from '@angular/core';

import { Activity } from '../shared/models/activity.model';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  @Input() activity: Activity;

  constructor() { }

  ngOnInit() {
  }

}
