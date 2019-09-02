import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandieCreateComponent } from './candie-create.component';

describe('CandieCreateComponent', () => {
  let component: CandieCreateComponent;
  let fixture: ComponentFixture<CandieCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandieCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
