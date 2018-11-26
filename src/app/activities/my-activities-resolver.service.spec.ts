import { TestBed } from '@angular/core/testing';

import { MyActivitiesResolverService } from './my-activities-resolver.service';

describe('MyActivitiesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyActivitiesResolverService = TestBed.get(MyActivitiesResolverService);
    expect(service).toBeTruthy();
  });
});
