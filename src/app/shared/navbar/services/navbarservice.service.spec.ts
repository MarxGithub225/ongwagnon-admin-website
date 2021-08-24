import { TestBed } from '@angular/core/testing';

import { NavbarserviceService } from './navbarservice.service';

describe('NavbarserviceService', () => {
  let service: NavbarserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
