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
