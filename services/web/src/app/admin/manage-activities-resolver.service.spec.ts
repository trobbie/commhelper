import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ManageActivitiesResolverService } from './manage-activities-resolver.service';

describe('ManageActivitiesResolverService', () => {
  let httpClient = HttpClient;
  let httpTestingController = HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ManageActivitiesResolverService = TestBed.get(ManageActivitiesResolverService);
    expect(service).toBeTruthy();
  });
});
