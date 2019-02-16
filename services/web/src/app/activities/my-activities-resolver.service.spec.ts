import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { MyActivitiesResolverService } from './my-activities-resolver.service';

describe('MyActivitiesResolverService', () => {
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
    const service: MyActivitiesResolverService = TestBed.get(MyActivitiesResolverService);
    expect(service).toBeTruthy();
  });
});
