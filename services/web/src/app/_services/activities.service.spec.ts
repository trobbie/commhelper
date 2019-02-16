import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ActivitiesService } from './activities.service';
import { Activity } from '../_models/activity.model';
import { Subscription } from 'rxjs';

describe('ActivitiesService', () => {
  // let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ActivitiesService;
  let sub: Subscription = null;

  const dummyActivities = [
    { id: 0, name: 'MockActivity0', dateCreated: new Date('2018-12-03T00:00:00') },
    { id: 1, name: 'MockActivity1', dateCreated: new Date('2018-12-03T01:00:00') },
    { id: 2, name: 'MockActivity2', dateCreated: new Date('2018-12-03T02:00:00') },
    { id: 3, name: 'MockActivity3', dateCreated: new Date('2018-12-03T03:00:00') }
  ];

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ActivitiesService
      ]
    }).compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ActivitiesService);
    expect(sub).toBeNull();
  });

  afterEach(() => {
    httpTestingController.verify();
    if (sub) {
      sub.unsubscribe();
      sub = null;
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getActivities()', () => {

    it('should return Observable<Activity[]>', () => {
      sub = service.getActivities().subscribe((activities) => {
        expect(activities.length).toBe(4);
        expect(activities).toEqual(dummyActivities);
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities);
    });

    xit('should throw if network error', () => {
      const emsg = 'simulated network error';
      sub = service.getActivities().subscribe(
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
      sub = service.getActivity(1).subscribe((activity) => {
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

      sub = service.getActivity(idNotFound).subscribe(
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
      sub = service.getSummary(1).subscribe((summary) => {
        expect(summary.id).toEqual(1);
        expect(summary).toEqual(service.convertActivityToDetailSummary(dummyActivities[1]));
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities[1]);
    });

    it('should return description containing the activity name', () => {
      sub = service.getSummary(1).subscribe((summary) => {
        expect(summary.id).toEqual(1);
        expect(summary.description).toContain(dummyActivities[1].name);
      });

      // note: getSummary() calls getActivity(), thus an activity GET request
      const req = httpTestingController.expectOne(`${service.activitiesUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyActivities[1]);
    });

    xit('should return 404 if id not found', () => {
      const idNotFound = 9999;
      const errormessage = 'Activity not found: id=' + idNotFound;
      sub = service.getSummary(idNotFound).subscribe(
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

  describe('#addActivity()', () => {
    it('should return Observable<Activity>, with same activity passed', () => {
      const new_activity = new Activity();
      // new_activity's id and date_created may be null before server's response
      new_activity.id = null;
      new_activity.dateCreated = null;
      new_activity.name = 'New Activity1';

      sub = service.addActivity(new_activity).subscribe((added_activity) => {
        expect(added_activity.name).toBe(new_activity.name);
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}`);
      expect(req.request.method).toBe('POST');
      req.flush(new_activity); // POST request mocked to return new_activity
    });

    it('should throw error notification when server responds with status 400', () => {
      const max_variable_length = 255;
      const new_activity = new Activity();
      new_activity.id = null;
      new_activity.dateCreated = null;
      new_activity.name = '!'.repeat(max_variable_length + 1);

      const errormessage = 'Name too long: ' + new_activity.name;

      sub = service.addActivity(new_activity).subscribe(
        (data) => { fail('should have failed with the 400 error'); },
        (err: HttpErrorResponse) => {
          expect(err.status).toEqual(400, 'status');
          expect(err.error).toEqual(errormessage, 'message');
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}`);
      expect(req.request.method).toBe('POST');
      // Respond with mock error
      req.flush(errormessage, { status: 400, statusText: 'Bad Request' });
    });

    it('should throw error notification if server returns object with id = null', () => {
      const new_activity = new Activity();
      // new_activity's id and date_created ignored
      new_activity.id = null;
      new_activity.dateCreated = null;
      new_activity.name = 'New Activity1';

      sub = service.addActivity(new_activity).subscribe(
        (data) => { fail('should have thrown error instead of returning Observable: ' + JSON.stringify(data)); },
        (err) => {
          expect(err.message).toContain('Server returned id = null');
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}`);
      expect(req.request.method).toBe('POST');
      // ensure mock response returns id of null
      new_activity.id = null;
      req.flush(new_activity); // POST request mocked to return new_activity

    });

    it('should throw error notification if server returns object with dateCreated = null', () => {
      const new_activity = new Activity();
      // new_activity's id and date_created ignored
      new_activity.id = null;
      new_activity.dateCreated = null;
      new_activity.name = 'New Activity1';

      sub = service.addActivity(new_activity).subscribe(
        (data) => { fail('should have thrown error instead of returning Observable: ' + JSON.stringify(data)); },
        (err) => {
          expect(err.message).toContain('Server returned dateCreated = null');
      });

      const req = httpTestingController.expectOne(`${service.activitiesUrl}`);
      expect(req.request.method).toBe('POST');
      // ensure mock response returns dateCreated of null
      new_activity.dateCreated = null;
      req.flush(new_activity); // POST request mocked to return new_activity
    });

  });
});
