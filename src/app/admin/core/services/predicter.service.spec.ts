import { TestBed } from '@angular/core/testing';

import { PredicterService } from './predicter.service';

describe('PredicterService', () => {
  let service: PredicterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredicterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
