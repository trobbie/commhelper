import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivitiesService } from '../../_services/activities.service';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss']
})
export class ManageActivitiesComponent implements OnInit {
  @ViewChild('listComponent') listComponent;

  constructor(
    private dataService: ActivitiesService
  ) {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.listComponent.canDeactivate();
  }

  onClosePanel($idChanged: number | null): void {
    this.listComponent.onClosePanel($idChanged);
  }

  onValuesChanged($event): void {
    this.listComponent.onValuesChanged($event);
  }

}
