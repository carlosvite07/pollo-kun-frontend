import { TestBed } from '@angular/core/testing';

import { ElectronicsService } from './electronics.service';

describe('ElectronicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronicsService = TestBed.get(ElectronicsService);
    expect(service).toBeTruthy();
  });
});
