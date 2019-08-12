import { Component, OnInit } from '@angular/core';
// import { RecordService } from '../record.service';
import { HOURS } from '../mock-hours';
import { Console } from '../console';
import { CONSOLES } from '../mock-console';
import { Hour } from '../hour';
import { Record } from '../record';

@Component({
  selector: 'app-hours-record',
  templateUrl: './hours-record.component.html',
  styleUrls: ['./hours-record.component.scss']
})
export class HoursRecordComponent implements OnInit {
  constructor() { }

  allConsoles = CONSOLES;
  avaliableHours = HOURS;
  avaliableConsoles: Console[] = [];
  records: Record[] = [];

  selectedConsole: Console;
  selectedHour: Hour;
  errorConsole: Boolean = false;
  errorHour: Boolean = false;

  idCounter = 0;

  agreed = 0;
  disagreed = 0;

  ngOnInit() {
    this.avaliableConsoles = this.getAvaliableConsoles()
  }

  getAvaliableConsoles(): Console[] {
    return this.allConsoles.filter(object => object.available === true);
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
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
    this.updateAvaliableConsoles(this.selectedConsole.id);
    this.selectedConsole = undefined;
    this.selectedHour = undefined;
  }

  getEndDate(now: Date): Date {
    return new Date(now.getTime() + this.selectedHour.hoursValue * 60 * 60 * 1000);
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

  setRecord(now: Date, endDate: Date): void {
    this.records.push(
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

  updateAvaliableConsoles(idConsole: number): void {
    let index = this.allConsoles.findIndex(object => object.id === idConsole);
    this.allConsoles[index].available = false;
    this.avaliableConsoles = this.getAvaliableConsoles();
  }

  endRecord(idRecord: number): void {
    let index = this.records.findIndex(object => object.id == idRecord);
    this.records.splice(index, 1);
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
