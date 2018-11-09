import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myactivities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  @ViewChild('listComponent') listComponent;

  constructor() {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.listComponent.canDeactivate();
  }

}
