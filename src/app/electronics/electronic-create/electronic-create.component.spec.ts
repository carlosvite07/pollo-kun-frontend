import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicCreateComponent } from './electronic-create.component';

describe('ElectronicCreateComponent', () => {
  let component: ElectronicCreateComponent;
  let fixture: ComponentFixture<ElectronicCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
