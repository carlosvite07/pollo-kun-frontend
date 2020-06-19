import { TestBed } from '@angular/core/testing';

import { ConsolesService } from './consoles.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('ConsolesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ConsolesService],
      imports: [AngularFirestoreModule]
    })
  );

  it('should be created', () => {
    const service: ConsolesService = TestBed.get(ConsolesService);
    expect(service).toBeTruthy();
  });
});
