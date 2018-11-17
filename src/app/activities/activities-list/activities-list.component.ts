import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ActivitiesService } from '../../_services/activities.service';
import { DetailSummary } from '../../_models/detail-summary';
import { DialogService } from '../../_services/dialog.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  private panelTitlePrefix = 'ngb-panel-';
  nameOfCreateActivityButton = 'Create Activity';
  summaries$: Observable<DetailSummary[]>;

  selectedId: number = null;
  otherPanelsDisabled = false;

   _summaries: DetailSummary[];

  @ViewChild('acc') accordionComponent;
  @ViewChild('details') detailsComponent;

  constructor(
    private dataService: ActivitiesService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getSummaryList();
  }

  getPanelTitlePrefix(): string {
    return this.panelTitlePrefix;
  }

  isPanelSelected(id: number): boolean {
     return this.selectedId === id;
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
  onClosePanel($activity): void {
    if ($activity !== null) {
      if (!this.selectedId) {
        // add placeholder to array; will get updated below
        // new entries should always be put in panel 1 (after "new activity" panel)
        this._summaries.splice(1, 0, {id: $activity.id, description: '', dateCreated: null});
      }
      // update only this summary (summaries$ should auto-update)
      this.dataService.getSummary($activity.id).forEach(
          (updatedSummary) => {
          const index = this._summaries.findIndex((summary) => summary.id === updatedSummary.id);
          this._summaries[index] = updatedSummary;
        },
      );
    }
    this.otherPanelsDisabled = false; // set this before collapsing
    this.accordionComponent.collapse(this.panelTitlePrefix + this.selectedId);

  }

  // onValuesChanged() is initiated by details component
  onValuesChanged($event): void {
    this.otherPanelsDisabled = $event;
  }

  getSummaryList(): void {
    if (this.dataService === null) {
      throw Error('dataService not assigned');
    }
    this.summaries$ = this.dataService.getSummaryList().pipe(
      switchMap((summaries) => {
        this._summaries = summaries;
        return of(this._summaries);
      }),
      // sort by dateCreated descending
      tap(results => results.sort((a, b) => (a < b) ? 1 : (a === b) ? 0 : -1)
        // add Create New Activity panel to front of list
        .unshift({id: 0, description: '<IGNORED SUMMARY>', dateCreated: null})
      )
    );
  }

  onCreateNewEntry(): void {
    this.selectedId = 0;
  }

}
