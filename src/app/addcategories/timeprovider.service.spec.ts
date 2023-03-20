import { TestBed } from '@angular/core/testing';

import { TimeproviderService } from './timeprovider.service';

describe('TimeproviderService', () => {
  let service: TimeproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
