import { Component, OnInit, ViewChild, ContentChild, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { DetailSummary } from '../../../_models/detail-summary';
import { DialogService } from '../../../_services/dialog.service';
import { SummaryDetailsService } from '../../../_services/summary-details-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary-details-list',
  templateUrl: './summary-details-list.component.html',
  styleUrls: ['./summary-details-list.component.scss']
})
export class SummaryDetailsListComponent implements OnInit {
  @Input() dataService: SummaryDetailsService;
  @Input() entityName = 'Entity';

  private panelTitlePrefix = 'ngb-panel-';
  get nameOfCreateButton() { return 'Create New ' + this.entityName; }
  _summaries: DetailSummary[];  // backing object of summaries$
  summaries$: Observable<DetailSummary[]>;
  selectedId: number = null;
  otherPanelsDisabled = false;

  @ViewChild('acc') accordionComponent;
  // detailsComponent is assigned by child details component
  //   only one details component exists at a time
  detailsComponent = null;

  constructor(
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSummaryList();
  }

  getPanelTitlePrefix(): string {
    return this.panelTitlePrefix;
  }

  isPanelSelected(id: number): boolean {
     return (this.selectedId != null) && (this.selectedId === id);
  }

  isPanelDisabled(id: number): boolean {
    if (this.otherPanelsDisabled) {
      return !this.isPanelSelected(id);
    } else {
      return false;
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation away (`true`) if no details or the details were unchanged
    if (this.selectedId == null || !this.otherPanelsDisabled) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  // before a panel is opened or closed, update the selection id
  beforeSelectionChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === null) { // then ignore
      return;
    }

    if ($event.nextState === true) { // panel being opened
      // to get the id, drop the panel id prefix
      this.selectedId = +$event.panelId.substring(this.panelTitlePrefix.length);
      if (this.detailsComponent) {
        this.detailsComponent.setEntityId(this.selectedId);
      }
    } else if ($event.nextState === false) { // being closed
      if (this.otherPanelsDisabled) {
        $event.preventDefault(); // do nothing if other panels disabled (means data was changed)
      } else {
        this.selectedId = null;
        if (this.detailsComponent) {
          this.detailsComponent.setEntityId(null);
        }
      }
    }  // else invalid nextState

  }

  // onClosePanel() is initiated by details component
  onClosePanel($idChanged: number | null): void {
    if ($idChanged === null) { // i.e. cancelling
      this.otherPanelsDisabled = false; // set this before collapsing
      this.accordionComponent.collapse(this.panelTitlePrefix + this.selectedId);
    } else {
      if (!this.selectedId) {
        // add placeholder to array; will get updated below
        // new entries should always be put in panel 1 (after "new element" panel)
        this._summaries.splice(1, 0, {id: $idChanged, description: 'Refreshing...', dateCreated: null});
      }
      // update only this summary (summaries$ should auto-update)
      this.dataService.getSummary($idChanged).forEach(
          (updatedSummary) => {
          const index = this._summaries.findIndex((summary) => summary.id === updatedSummary.id);
          this._summaries[index] = updatedSummary;
          this.otherPanelsDisabled = false; // set this before collapsing
          this.accordionComponent.collapse(this.panelTitlePrefix + this.selectedId);
        },
      );
    }
  }

  // onValuesChanged() is initiated by details component
  onValuesChanged($event): void {
    this.otherPanelsDisabled = $event;
  }

  getSummaryList(): void {
    if (this.dataService === null) {
      throw Error('dataService not assigned');
    }
    // depend on route resolvers for the data
    this.route.data
      .subscribe((data: { summaries: DetailSummary[]}) => {
        if (!data.summaries) {
          throw Error('resolver not attached that retrieves the data');
        }
        this._summaries = data.summaries;
        this.summaries$ = of(this._summaries).pipe(
          // sort by dateCreated descending
          tap(results => results.sort((a, b) => (a < b) ? 1 : (a === b) ? 0 : -1)
            // add "create new element" panel to front of list
            .unshift({id: 0, description: '<IGNORED SUMMARY>', dateCreated: null})
          )
        );
      });

  }

  onCreateNewEntry(): void {
    this.selectedId = 0;
  }

}
