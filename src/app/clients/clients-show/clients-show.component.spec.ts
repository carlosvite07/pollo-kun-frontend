import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsShowComponent } from './clients-show.component';

describe('ClientsShowComponent', () => {
  let component: ClientsShowComponent;
  let fixture: ComponentFixture<ClientsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
