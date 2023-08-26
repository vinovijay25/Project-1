import { TestBed } from '@angular/core/testing';

import { UploadCollegeDataService } from './upload-college-data.service';

describe('UploadCollegeDataService', () => {
  let service: UploadCollegeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadCollegeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
