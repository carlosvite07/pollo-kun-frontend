import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersPricesComponent } from './computers-prices.component';

describe('ComputersPricesComponent', () => {
  let component: ComputersPricesComponent;
  let fixture: ComponentFixture<ComputersPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComputersPricesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
