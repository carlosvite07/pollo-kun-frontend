import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { HOURS } from '../mock-hours';
import { Console } from '../console.model';
// import { CONSOLES } from '../mock-console';
import { Hour } from '../hour';
import { Record } from '../record.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-hours-record',
  templateUrl: './hours-record.component.html',
  styleUrls: ['./hours-record.component.scss']
})
export class HoursRecordComponent implements OnInit {

  allConsoles: Console[] = [];
  records: Record[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    let countId = 0;
    this.recordService.getConsoles().subscribe(data => {
      this.allConsoles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
      } as Console;
      });
  });

    this.recordService.getRecords().subscribe(data => {
    this.records = data.map(e => {
      let newRecord = {
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      };
      newRecord.startDate = newRecord.startDate.toDate();
      newRecord.endDate = newRecord.endDate.toDate();
      return newRecord as Record;
    })
  });
  }

avaliableHours = HOURS;

selectedConsole: Console;
selectedHour: Hour;
errorConsole: Boolean = false;
errorHour: Boolean = false;
idCounter = 0;


makeARecord() {
  this.errorConsole = (this.selectedConsole) ? false : true;
  this.errorHour = (this.selectedHour) ? false : true;
  if (this.errorConsole || this.errorHour) {
    return;
  }
  let now = new Date()
  let endDate = this.getEndDate(now);
  let newRecord = {
    startDate: now,
    endDate: endDate,
    console: this.selectedConsole,
    price: this.getPrice(now, endDate),
    finished: false
  } as Record;
  this.createRecord(newRecord);
  this.updateAvaliableConsoles();
  this.selectedConsole = undefined;
  this.selectedHour = undefined;
}

getEndDate(now: Date): Date {
  return new Date(now.getTime() + this.selectedHour.hoursValue * 60 * 60 * 1000);
}

createRecord(record: Record): void {
  this.selectedConsole.available = false;
  this.recordService.createRecord(record,this.selectedConsole);
}

getPrice(start: Date, end: Date): number {
  let difference: number = (end.getTime() - start.getTime()) / (60 * 60 * 1000);
  let hours: number = Math.floor(difference);
  let minutes: number = difference - hours;
  let total: number = 0;
  if (minutes != 0) {
    total += this.selectedConsole.halfHourPrice;
  }
  if (hours >= 1) {
    total += hours * this.selectedConsole.hourPrice;
  }
  return total;
}

updateAvaliableConsoles(): void {
  this.selectedConsole.available = false;
  this.recordService.updateConsole(this.selectedConsole);
}

  // endRecord(record: Record): void {
  //   let indexRecord = this.records.findIndex(object => object.id === record.id);
  //   this.records.splice(indexRecord, 1);
    // let indexConsole = this.allConsoles.findIndex(object => object.id === record.selectedConsole.id);
    // this.allConsoles[indexConsole].available = true; 
    // this.avaliableConsoles = this.getAvaliableConsoles();
  // }

  // updateRecords(record: Record): void {
  //   let indexRecord = this.records.findIndex(object => object.id === record.id);
  //   this.records.splice(indexRecord, 1, record);
  // }

  // constructor(private recordService: RecordService) { }
  // ngOnInit() {
  //   this.getConsoles();
  //   this.getRecords();
  // }

  // getConsoles(): void {
  //   this.recordService.getConsoles().
  //     subscribe(consoles =>
  //       this.avaliableConsoles = consoles.filter(object => object.available === true));
  // }

  // getRecords(): void {
  //   this.recordService.getRecords().
  //     subscribe(records => this.records = records);
  // }

  // makeARecord(idConsole: number, record: Record): void {
  // this.recordService.makeARecord(idConsole, record)
  //   .subscribe();
  // }

  // onEndRecord(idConsole: number): void {
  //   console.log('endParent');
  // this.recordService.endRecord(idConsole).
  //   subscribe(consoles => this.avaliableConsoles = consoles.filter(object => object.available === true));
  // }


}
