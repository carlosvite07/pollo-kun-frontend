import { TestBed } from '@angular/core/testing';

import { RecordService } from './record.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('RecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RecordService],
    imports: [AngularFirestoreModule]
  }));

  it('should be created', () => {
    const service: RecordService = TestBed.get(RecordService);
    expect(service).toBeTruthy();
  });
});