import { TestBed } from '@angular/core/testing';
import { TestSummaryDetailsService } from './test-summary-details.service';

describe('TestSummaryDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestSummaryDetailsService = TestBed.get(TestSummaryDetailsService);
    expect(service).toBeTruthy();
  });
});
