import { TestBed } from '@angular/core/testing';

import { YoutubevideoService } from './youtubevideo.service';

describe('YoutubevideoService', () => {
  let service: YoutubevideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubevideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
