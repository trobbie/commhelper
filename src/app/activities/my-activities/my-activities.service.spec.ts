import { TestBed } from '@angular/core/testing';

import { MyActivitiesService } from './my-activities.service';

describe('MyActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyActivitiesService = TestBed.get(MyActivitiesService);
    expect(service).toBeTruthy();
  });
});
