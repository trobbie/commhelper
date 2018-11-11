import { TestBed } from '@angular/core/testing';

import { TestActivitiesService } from './test-activities.service';

describe('TestActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestActivitiesService = TestBed.get(TestActivitiesService);
    expect(service).toBeTruthy();
  });
});
