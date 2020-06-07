import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicShowComponent } from './electronic-show.component';

describe('ElectronicShowComponent', () => {
  let component: ElectronicShowComponent;
  let fixture: ComponentFixture<ElectronicShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
