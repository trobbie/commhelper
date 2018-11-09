import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss']
})
export class ManageActivitiesComponent implements OnInit {
  @ViewChild('listComponent') listComponent;

  constructor() {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.listComponent.canDeactivate();
  }

}
