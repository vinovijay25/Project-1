import { TestBed } from '@angular/core/testing';

import { RankPredictorService } from './rank-predictor.service';

describe('RankPredictorService', () => {
  let service: RankPredictorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankPredictorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
