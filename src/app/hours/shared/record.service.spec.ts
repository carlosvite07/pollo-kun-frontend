import { TestBed } from '@angular/core/testing';

import { RecordService } from './record.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('RecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RecordService, AngularFirestore]
  }));

  it('should be created', () => {
    const service: RecordService = TestBed.get(RecordService);
    expect(service).toBeTruthy();
  });
});