import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConsolesModalComponent } from './consoles-modal.component';

describe('ConsolesModalComponent', () => {
  let component: ConsolesModalComponent;
  let fixture: ComponentFixture<ConsolesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolesModalComponent],
      imports: [FormsModule],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
