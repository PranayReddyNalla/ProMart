import { TestBed } from '@angular/core/testing';

import { CategoryproviderService } from './categoryprovider.service';

describe('CategoryproviderService', () => {
  let service: CategoryproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
