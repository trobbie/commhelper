import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { ActivityDetailResolverService } from './activity-detail-resolver.service';
import { AppRoutingModule } from '../app-routing.module';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

describe('ActivityDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      MyActivitiesComponent,
      PageNotFoundComponent
    ],
    imports: [
      AppRoutingModule
    ],
    providers: [
      { provide: APP_BASE_HREF, useValue : '/' }
    ]
  }));

  it('should be created', () => {
    const service: ActivityDetailResolverService = TestBed.get(ActivityDetailResolverService);
    expect(service).toBeTruthy();
  });
});
