import { TestBed } from '@angular/core/testing';

import { AdministratorserviceService } from './administratorservice.service';

describe('AdministratorserviceService', () => {
  let service: AdministratorserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministratorserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
