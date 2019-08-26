import { TestBed } from '@angular/core/testing';

import { StationeryService } from './stationery.service';

describe('StationeryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationeryService = TestBed.get(StationeryService);
    expect(service).toBeTruthy();
  });
});
