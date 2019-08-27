import { TestBed } from '@angular/core/testing';

import { ModalService } from './consoles-modal.service';

describe('ModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });
});
