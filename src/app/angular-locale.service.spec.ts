import { TestBed } from '@angular/core/testing';

import { AngularLocaleRegistrarService } from './angular-locale.service';

describe('AngularLocaleService', () => {
  let service: AngularLocaleRegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularLocaleRegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
