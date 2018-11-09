import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

import { ActivitiesService } from '../../_services/activities.service';
import { DetailSummary } from '../../_models/detail-summary';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  private panelTitlePrefix = 'ngb-panel-';
  listData$: Observable<DetailSummary[]>;
  private selectedId: number = null;

  @ViewChild('acc') accordianComponent;
  @ViewChild('details') detailsComponent;

  constructor(
    private dataService: ActivitiesService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getSummaryList();
  }

  getPanelTitlePrefix(): string {
    return this.panelTitlePrefix;
  }

  getSelectedId(): number {
    return this.selectedId;
  }

  isPanelSelected(summary: DetailSummary): boolean {
    return summary && this.selectedId && this.selectedId !== summary.id;
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no activity or the activity is unchanged
    if (this.selectedId == null || !this.detailsComponent.isDataChanged()) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  // right before a panel is opened or closed, update the selection id
  beforeSelectionChange($event: NgbPanelChangeEvent) {
    if (!$event.panelId) { // then ignore
      return;
    }

    if ($event.nextState === true) { // panel being opened
      // to get the id, drop the panel id prefix
      this.selectedId = +$event.panelId.substring(this.panelTitlePrefix.length);
    } else if ($event.nextState === false) { // being closed
      this.selectedId = null;
    }  // else invalid nextState

  }

  // onDetailsClose() is initiated by details component
  onDetailsClose($event, activity): void {
    this.accordianComponent.collapse(this.panelTitlePrefix + this.selectedId);
    this.selectedId = null;
    this.getSummaryList(); // TODO: only update the id just changed, and only when changed
  }

  getSummaryList() {
    if (this.dataService === null) {
      throw Error('dataService not assigned');
    }
    this.listData$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        // this.selectId(+params.get('id'));
        return this.dataService.getSummaryList();
      })
    );
  }

  onCreateNewEntry(): void {
    // this.router.navigate(['/myactivities/new']);
    // this.activitiesService.newActivity();
  }

}
