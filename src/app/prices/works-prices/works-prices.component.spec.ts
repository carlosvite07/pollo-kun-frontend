import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksPricesComponent } from './works-prices.component';

describe('WorksPricesComponent', () => {
  let component: WorksPricesComponent;
  let fixture: ComponentFixture<WorksPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorksPricesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
