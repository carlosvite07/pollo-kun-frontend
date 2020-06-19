import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { ConsolesShowComponent } from './consoles-show.component';

describe('ConsolesShowComponent', () => {
  let component: ConsolesShowComponent;
  let fixture: ComponentFixture<ConsolesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolesShowComponent],
      providers: [AngularFirestore]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
