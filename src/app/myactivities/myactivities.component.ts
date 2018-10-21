import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Activity } from '../shared/models/activity.model';
import { MyactivitiesService } from './myactivities.service';

@Component({
  selector: 'app-myactivities',
  templateUrl: './myactivities.component.html',
  styleUrls: ['./myactivities.component.scss']
})
export class MyactivitiesComponent implements OnInit {

  myactivities: Activity[];

  constructor(private myactivitiesService: MyactivitiesService) { }

  ngOnInit() {
    this.getMyactivities();
  }

  getMyactivities(): void {
    this.myactivitiesService.getMyactivities()
      .subscribe(myactivities => this.myactivities = myactivities);
  }

}
