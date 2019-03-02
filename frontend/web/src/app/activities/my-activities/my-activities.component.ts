import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivitiesService } from '../../_services/activities.service';

@Component({
  selector: 'app-myactivities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  get dataService() { return this._dataService; }

  @ViewChild('listComponent') listComponent;

  constructor(
    private _dataService: ActivitiesService
  ) {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    // can deactivate if the listComponent says ok
    return this.listComponent.canDeactivate();
  }
}
