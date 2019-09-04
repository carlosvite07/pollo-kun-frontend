import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerShowComponent } from './computer-show.component';

describe('ComputerShowComponent', () => {
  let component: ComputerShowComponent;
  let fixture: ComponentFixture<ComputerShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
