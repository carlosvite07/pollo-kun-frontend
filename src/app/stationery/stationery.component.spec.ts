import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationeryComponent } from './stationery.component';

describe('StationeryComponent', () => {
  let component: StationeryComponent;
  let fixture: ComponentFixture<StationeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
