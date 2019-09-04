import { TestBed } from '@angular/core/testing';

import { ComputersService } from './computers.service';

describe('ComputersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComputersService = TestBed.get(ComputersService);
    expect(service).toBeTruthy();
  });
});
