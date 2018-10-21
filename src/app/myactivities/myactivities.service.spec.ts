import { TestBed } from '@angular/core/testing';

import { MyactivitiesService } from './myactivities.service';

describe('MyactivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyactivitiesService = TestBed.get(MyactivitiesService);
    expect(service).toBeTruthy();
  });
});
