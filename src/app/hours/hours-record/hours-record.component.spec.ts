import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';

import { HoursRecordComponent } from './hours-record.component';
import { RecordComponent } from '../record/record.component';
import { RecordService } from '../shared/record.service';
import { Console } from '../shared/console.model';
import { firestore } from 'firebase';

describe('HoursRecordComponent', () => {
  let component: HoursRecordComponent;
  let fixture: ComponentFixture<HoursRecordComponent>;

  //Mock class
  class MockRecordService {
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

    getRecords() {
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
                  endDate:{
                    toDate(){
                      return new Date();
                    }
                  },
                  finished: false,
                  price: 15,
                  startDate:{
                    toDate(){
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
  
  let MockRecordServiceObject = new MockRecordService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HoursRecordComponent, RecordComponent],
      imports: [FormsModule],
      providers: [AngularFirestore, { provide: RecordService, useClass: MockRecordService }]
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

  let consoles;

  beforeEach(() => {
    consoles = [
      { id: 1, name: 'XBOX 360', available: true, hourPrice: 10, type: '360', halfHourPrice: 7 },
    ]
  });


  it(`should return all Consoles`, async(() => {
    const fixture = TestBed.createComponent(HoursRecordComponent);
    const app = fixture.componentInstance;

    //arrange
    let getSpy = spyOn(MockRecordServiceObject,'getConsoles').and.returnValue({ subscribe: () => { } });

    //act
    app.ngOnInit();

    // MockRecordServiceObject.getConsoles();

    //assert
    expect(getSpy).toHaveBeenCalled();
    // expect(getSpy).toContain(consoles[0]);
  }));



});
