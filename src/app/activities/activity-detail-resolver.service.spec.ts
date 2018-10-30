import { TestBed } from '@angular/core/testing';

import { ActivityDetailResolverService } from './activity-detail-resolver.service';

describe('ActivityDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityDetailResolverService = TestBed.get(ActivityDetailResolverService);
    expect(service).toBeTruthy();
  });
});
