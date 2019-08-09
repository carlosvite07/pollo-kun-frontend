import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { HOURS } from '../mock-hours';
import { Console } from '../console';
import { Hour } from '../hour';
import { Record } from '../record';

@Component({
  selector: 'app-hours-record',
  templateUrl: './hours-record.component.html',
  styleUrls: ['./hours-record.component.scss']
})
export class HoursRecordComponent implements OnInit {

  constructor(private recordService: RecordService) { }

  avaliableConsoles: Console[];
  hours = HOURS;
  avaliableHours = this.hours;

  selectedConsole: Console;
  selectedHour: Hour;
  errorConsole: Boolean = false;
  errorHour: Boolean = false;

  records: Record[] = [];

  ngOnInit() {
    this.getConsoles();
  }

  getConsoles(): void {
    this.recordService.getConsoles().
      subscribe(consoles => this.avaliableConsoles = consoles.filter(object => object.available === true));
  }

  createRecord() {
    this.errorConsole = (this.selectedConsole) ? false : true;
    this.errorHour = (this.selectedHour) ? false : true;
    if (this.errorConsole || this.errorHour) {
      return;
    }
    let now = new Date();
    let endDate = this.getEndDate(now);
    this.records.push(
      {
        startDate: now,
        endDate: endDate,
        selectedConsole: this.selectedConsole,
        selectedHour: this.selectedHour,
        price: this.getPrice(now, endDate),
      }
    );
    this.busyConsole(this.selectedConsole.id);
    // this.avaliableConsoles = this.avaliableConsoles.filter(value => value.id !== this.selectedConsole.id);
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
      if (hours % 2 === 0) {
        total += hours * this.selectedConsole.promoPrice;
      } else {
        total += ((hours - 1) * this.selectedConsole.promoPrice) + this.selectedConsole.price;
      }
    }
    return total;
  }

  busyConsole(id: number): void{
    this.recordService.busyConsole(id).
      subscribe(consoles => this.avaliableConsoles = consoles.filter(object => object.available === true));
  }

}
