import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivitiesService } from 'src/app/_services/activities.service';

@Component({
  selector: 'app-myactivities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  @ViewChild('listComponent') listComponent;

  get dataService() { return this._dataService; }

  constructor(
    private _dataService: ActivitiesService
  ) {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.listComponent.canDeactivate();
  }

}
