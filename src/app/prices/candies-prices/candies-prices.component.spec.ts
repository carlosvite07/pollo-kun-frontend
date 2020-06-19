import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandiesPricesComponent } from './candies-prices.component';

describe('CandiesPricesComponent', () => {
  let component: CandiesPricesComponent;
  let fixture: ComponentFixture<CandiesPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandiesPricesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandiesPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
