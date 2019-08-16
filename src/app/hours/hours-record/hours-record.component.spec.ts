import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursRecordComponent } from './hours-record.component';

describe('HoursRecordComponent', () => {
  let component: HoursRecordComponent;
  let fixture: ComponentFixture<HoursRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
