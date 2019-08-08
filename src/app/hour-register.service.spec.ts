import { TestBed } from '@angular/core/testing';

import { HourRegisterService } from './hour-register.service';

describe('HourRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HourRegisterService = TestBed.get(HourRegisterService);
    expect(service).toBeTruthy();
  });
});
