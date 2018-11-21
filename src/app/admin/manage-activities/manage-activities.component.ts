import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivitiesService } from '../../_services/activities.service';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss']
})
export class ManageActivitiesComponent implements OnInit {
  get dataService() { return this._dataService; }

  @ViewChild('listComponent') listComponent;

  constructor(
    private _dataService: ActivitiesService
  ) {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.listComponent.canDeactivate();
  }

}
