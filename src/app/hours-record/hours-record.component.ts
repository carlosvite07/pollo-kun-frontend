import { Component, OnInit } from '@angular/core';
import { CONSOLES } from '../mock-console';
import { HOURS } from '../mock-hours';
import { Console } from '../console';
import { Hour } from '../hour';
import { Register } from '../register';
import { endianness } from 'os';

@Component({
  selector: 'app-hours-record',
  templateUrl: './hours-record.component.html',
  styleUrls: ['./hours-record.component.scss']
})
export class HoursRecordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  consoles = CONSOLES;
  hours = HOURS;

  selectedConsole: Console;
  selectedHour: Hour;

  registers: Register[] = [];

  createRegister() {
    let now = new Date();
    let endDate = this.getEndDate(now);
    this.getPrice(now,endDate);
    // this.registers.push(
    //   {
    //     startDate: now,
    //     endDate: endDate,
    //     selectedConsole: this.selectedConsole.id,
    //     selectedHour: this.selectedHour.id,
    //     price: this.getPrice(now,endDate),
    //   }
    // )
    // console.log(this.registers);
  }

  getEndDate(now: Date){
    return new Date(now.getMilliseconds()+this.selectedHour.hoursValue*60*60*1000);
  }

  getPrice(start: Date, end: Date) {
    let hours = start.getHours()-end.getHours();
    console.log(hours)
  }


}
