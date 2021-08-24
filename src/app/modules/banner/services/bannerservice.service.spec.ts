import { TestBed } from '@angular/core/testing';

import { BannerserviceService } from './bannerservice.service';

describe('BannerserviceService', () => {
  let service: BannerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
