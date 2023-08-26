import { TestBed } from '@angular/core/testing';

import { VideopopupService } from './videopopup.service';

describe('VideopopupService', () => {
  let service: VideopopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideopopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
