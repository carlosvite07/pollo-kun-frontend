import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';

import { ConsolesRecordComponent } from './consoles-record.component';
import { RecordComponent } from '../consoles-show/consoles-show.component';
import { ConsolesService } from '../shared/consoles.service';
import { Console } from '../shared/console.model';
import { firestore } from 'firebase';

describe('ConsolesRecordComponent', () => {
  let component: ConsolesRecordComponent;
  let fixture: ComponentFixture<ConsolesRecordComponent>;

  //Mock class
  class MockConsolesService {
    getConsoles(): any {
      return of(
        [{
          payload: {
            doc: {
              id: '1',
              data: () => [
                { id: 1, name: 'XBOX 360', available: true, hourPrice: 10, type: '360', halfHourPrice: 7 }
              ]
            }
          }
        }]
      )
    }

    getConsolesRecords() {
      return of(
        [{
          payload: {
            doc: {
              id: '1',
              data: () => [
                {
                  console: {
                    available: false,
                    halfHourPrice: 10,
                    hourPrice: 15,
                    id: "rWNFu4ZXGm5hNxzv9blw",
                    name: "2 XBOX ONE",
                    type: "one"
                  },
                  endDate: {
                    toDate() {
                      return new Date();
                    }
                  },
                  finished: false,
                  price: 15,
                  startDate: {
                    toDate() {
                      return new Date();
                    }
                  }
                },

              ]
            }
          }
        }]
      )
    }
  }

  let MockConsolesServiceObject = new MockConsolesService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolesRecordComponent, RecordComponent],
      imports: [FormsModule],
      providers: [AngularFirestore, { provide: ConsolesService, useClass: MockConsolesService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let consoles;

  beforeEach(() => {
    consoles = [
      { id: 1, name: 'XBOX 360', available: true, hourPrice: 10, type: '360', halfHourPrice: 7 },
    ]
  });


  it(`should return all Consoles`, async(() => {
    const fixture = TestBed.createComponent(ConsolesRecordComponent);
    const app = fixture.componentInstance;

    //arrange
    let getSpy = spyOn(MockConsolesServiceObject, 'getConsoles').and.returnValue({ subscribe: () => { } });

    //act
    app.ngOnInit();

    // MockConsolesServiceObject.getConsoles();

    //assert
    expect(getSpy).toHaveBeenCalled();
    // expect(getSpy).toContain(consoles[0]);
  }));



});
