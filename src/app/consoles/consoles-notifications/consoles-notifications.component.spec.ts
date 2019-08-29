import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolesNotificationsComponent } from './consoles-notifications.component';

describe('ConsolesNotificationsComponent', () => {
  let component: ConsolesNotificationsComponent;
  let fixture: ComponentFixture<ConsolesNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolesNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
