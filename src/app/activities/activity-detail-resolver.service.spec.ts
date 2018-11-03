import { TestBed } from '@angular/core/testing';

import { ActivityDetailResolverService } from './activity-detail-resolver.service';
import { AppRoutingModule } from '../app-routing.module';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { SharedModule } from '../shared/shared.module';

describe('ActivityDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      MyActivitiesComponent
    ],
    imports: [
      SharedModule,
      AppRoutingModule
    ]
  }));

  it('should be created', () => {
    const service: ActivityDetailResolverService = TestBed.get(ActivityDetailResolverService);
    expect(service).toBeTruthy();
  });
});
