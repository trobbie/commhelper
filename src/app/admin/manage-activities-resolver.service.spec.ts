import { TestBed } from '@angular/core/testing';

import { ManageActivitiesResolverService } from './manage-activities-resolver.service';

describe('ManageActivitiesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageActivitiesResolverService = TestBed.get(ManageActivitiesResolverService);
    expect(service).toBeTruthy();
  });
});
