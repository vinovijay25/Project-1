import { TestBed } from '@angular/core/testing';

import { VideocounsellingService } from './videocounselling.service';

describe('VideocounsellingService', () => {
  let service: VideocounsellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideocounsellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
