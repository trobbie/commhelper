import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ActivitiesService } from './activities.service';
import { DetailSummary } from '../_models/detail-summary';
import { Activity } from '../_models/activity.model';

describe('ActivitiesService', () => {
  // let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ActivitiesService;

  const dummyActivities = [
    { id: 0, name: 'MockActivity0', dateCreated: new Date('2018-12-03T00:00:00') },
    { id: 1, name: 'MockActivity1', dateCreated: new Date('2018-12-03T01:00:00') },
    { id: 2, name: 'MockActivity2', dateCreated: new Date('2018-12-03T02:00:00') },
    { id: 3, name: 'MockActivity3', dateCreated: new Date('2018-12-03T03:00:00') }
  ];

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        // HttpModule
        HttpClientTestingModule
      ],
      providers: [
        ActivitiesService,
        // { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();

    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ActivitiesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getActivities()', () => {
    it('should return Observable<Activity[]>', () => {
      service.getActivities().subscribe((activities) => {
        expect(activities.length).toBe(4);
        expect(activities).toEqual(dummyActivities);
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities);
    });

    xit('should throw if network error', () => {
      const emsg = 'simulated network error';
      service.getActivities().subscribe(
        (data) => { fail('should have failed with the 404 error'); },
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404, 'status');
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}\\{idNotFound}`);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });

      // Respond with mock error
      req.error(mockError);
    });
  });

  describe('#getActivity()', () => {
    it('should return Observable<Activity>', () => {
      service.getActivity(1).subscribe((activity) => {
        expect(activity.id).toEqual(1);
        expect(activity).toEqual(dummyActivities[1]);
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities[1]);
    });

    it('should throw an error if id not found', () => {
      const idNotFound = 9999;
      const errormessage = 'Activity not found: id=' + idNotFound;

      service.getActivity(idNotFound).subscribe(
        (data) => {
          fail('should have failed with the 404 error'); },
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404, 'status');
          expect(err.error).toEqual(errormessage, 'message');
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}/${idNotFound}`);
      // Respond with mock error
      req.flush(errormessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#getSummary()', () => {
    it('should return Observable<DetailSummary>', () => {
      service.getSummary(1).subscribe((summary) => {
        expect(summary.id).toEqual(1);
        expect(summary).toEqual(jasmine.any(DetailSummary));
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities[1]);
    });

    it('should return description containing the activity name', () => {
      service.getSummary(1).subscribe((summary) => {
        expect(summary.id).toEqual(1);
        expect(summary.description).toContain(dummyActivities[1].name);
      });

      // note: getSummary() calls getActivity(), thus an activity GET request
      const req = httpTestingController.expectOne(`${service.activitiesUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities[1]);
    });

    xit('should throw an error if id not found', () => {
      const idNotFound = 9999;
      const errormessage = 'Activity not found: id=' + idNotFound;
      service.getSummary(idNotFound).subscribe(
        (data) => { fail('should have failed with the 404 error'); },
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404, 'status');
          expect(err.error).toEqual(errormessage, 'message');
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}/${idNotFound}`);
      // Respond with mock error
      req.flush(errormessage, { status: 404, statusText: 'Not Found' });
    });
  });
});
