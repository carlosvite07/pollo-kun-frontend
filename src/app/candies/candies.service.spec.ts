import { TestBed } from '@angular/core/testing';

import { CandiesService } from './candies.service';

describe('CandiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandiesService = TestBed.get(CandiesService);
    expect(service).toBeTruthy();
  });
});
