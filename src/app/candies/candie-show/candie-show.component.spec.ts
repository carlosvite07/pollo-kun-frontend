import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandieShowComponent } from './candie-show.component';

describe('CandieShowComponent', () => {
  let component: CandieShowComponent;
  let fixture: ComponentFixture<CandieShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandieShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandieShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
