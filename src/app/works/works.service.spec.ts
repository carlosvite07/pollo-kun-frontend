import { TestBed } from '@angular/core/testing';

import { WorksService } from './works.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('WorksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [WorksService, AngularFirestore]
  }));

  it('should be created', () => {
    const service: WorksService = TestBed.get(WorksService);
    expect(service).toBeTruthy();
  });
});
