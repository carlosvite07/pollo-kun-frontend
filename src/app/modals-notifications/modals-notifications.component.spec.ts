import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsNotificationsComponent } from './modals-notifications.component';

describe('ModalsNotificationsComponent', () => {
  let component: ModalsNotificationsComponent;
  let fixture: ComponentFixture<ModalsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalsNotificationsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
