import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ActivitiesService } from '../../_services/activities.service';
import { DetailSummary } from '../../_models/detail-summary';
import { DialogService } from '../../_services/dialog.service';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  private panelTitlePrefix = 'ngb-panel-';
  listData$: Observable<DetailSummary[]>;
  private selectedId: number = null;
  otherPanelsDisabled = false;

  @ViewChild('acc') accordionComponent;
  @ViewChild('details') detailsComponent;

  constructor(
    private dataService: ActivitiesService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getSummaryList();
  }

  getSelectedId(): number {
    return this.selectedId;
  }

  getPanelTitlePrefix(): string {
    return this.panelTitlePrefix;
  }

  isPanelSelected(id: number): boolean {
    return id && this.selectedId && this.selectedId === id;
  }

  isPanelDisabled(id: number): boolean {
    if (this.otherPanelsDisabled) {
      return !this.isPanelSelected(id);
    } else {
      return false;
    }
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
      if (this.otherPanelsDisabled) {
        $event.preventDefault(); // do nothing if other panels disabled (means data was changed)
      } else {
        this.selectedId = null;
      }
    }  // else invalid nextState

  }

  // onClosePanel() is initiated by details component
  onClosePanel($event, activity): void {
    this.accordionComponent.collapse(this.panelTitlePrefix + this.selectedId);
    this.selectedId = null;
    this.otherPanelsDisabled = false;
    this.getSummaryList(); // TODO: only update the id just changed, and only when changed
  }

  // onValuesChanged() is initiated by details component
  onValuesChanged($event): void {
    this.otherPanelsDisabled = $event;
  }

  getSummaryList(): void {
    if (this.dataService === null) {
      throw Error('dataService not assigned');
    }
    this.listData$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        // this.selectId(+params.get('id'));
        return this.dataService.getSummaryList();
      }),
      // sort by dateCreated descending
      tap(results => results.sort((a, b) => (a < b) ? 1 : (a === b) ? 0 : -1))
    );
  }

  onCreateNewEntry(): void {
    this.dataService.newActivity();
  }

}
