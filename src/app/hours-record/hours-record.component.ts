import { Component, OnInit } from '@angular/core';
// import { RecordService } from '../record.service';
import { HOURS } from '../mock-hours';
import { Console } from '../console';
// import { CONSOLES } from '../mock-console';
import { Hour } from '../hour';
import { Record } from '../record';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-hours-record',
  templateUrl: './hours-record.component.html',
  styleUrls: ['./hours-record.component.scss']
})
export class HoursRecordComponent implements OnInit {

  allConsoles: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.allConsoles = db.collection('consoles', ref => ref.where('available', '==', true).orderBy('name')).valueChanges();
    db.collection('users').add({
      name: 'Carlos',
      surname: 'Castañeda',
      age: 25,
    });
  }

  // allConsoles = CONSOLES;
  avaliableHours = HOURS;
  avaliableConsoles: Console[] = [];
  records: Record[] = [];
  selectedConsole: Console;
  selectedHour: Hour;
  errorConsole: Boolean = false;
  errorHour: Boolean = false;
  idCounter = 0;

  ngOnInit() {
    this.getAvaliableConsoles()
  }

  getAvaliableConsoles(): void {
    this.allConsoles.subscribe(consoles => {
      this.avaliableConsoles = consoles.filter(object => object.available === true).sort((a, b) => a.id - b.id)
    });
  }

  makeARecord() {
    this.errorConsole = (this.selectedConsole) ? false : true;
    this.errorHour = (this.selectedHour) ? false : true;
    if (this.errorConsole || this.errorHour) {
      return;
    }
    let now = new Date();
    let endDate = this.getEndDate(now);
    this.setRecord(now, endDate);
    // this.updateAvaliableConsoles(this.selectedConsole.id);
    this.selectedConsole = undefined;
    this.selectedHour = undefined;
  }

  getEndDate(now: Date): Date {
    return new Date(now.getTime() + this.selectedHour.hoursValue * 60 * 60 * 1000);
  }

  setRecord(now: Date, endDate: Date): void {
    this.records.unshift(
      {
        id: this.idCounter++,
        startDate: now,
        endDate: endDate,
        idConsole: this.selectedConsole.id,
        price: this.getPrice(now, endDate),
        selectedConsole: this.selectedConsole,
        selectedHour: this.selectedHour
      }
    );
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
      total += hours * this.selectedConsole.price;
    }
    return total;
  }

  // updateAvaliableConsoles(idConsole: number): void {
  //   let index = this.allConsoles.findIndex(object => object.id === idConsole);
  //   this.allConsoles[index].available = false;
  //   this.avaliableConsoles = this.getAvaliableConsoles();
  // }

  endRecord(record: Record): void {
    let indexRecord = this.records.findIndex(object => object.id === record.id);
    this.records.splice(indexRecord, 1);
    // let indexConsole = this.allConsoles.findIndex(object => object.id === record.selectedConsole.id);
    // this.allConsoles[indexConsole].available = true; 
    // this.avaliableConsoles = this.getAvaliableConsoles();
  }

  updateRecords(record: Record): void{
    let indexRecord = this.records.findIndex(object => object.id === record.id);
    this.records.splice(indexRecord, 1, record);
  }

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
