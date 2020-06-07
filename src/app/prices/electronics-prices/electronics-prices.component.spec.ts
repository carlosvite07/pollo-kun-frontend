import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsPricesComponent } from './electronics-prices.component';

describe('ElectronicsPricesComponent', () => {
  let component: ElectronicsPricesComponent;
  let fixture: ComponentFixture<ElectronicsPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicsPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicsPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
