import { Component, OnInit } from '@angular/core';
import { ConsolesService } from '../shared/consoles.service';
import { Console } from '../shared/console.model';
import { ConsoleRecord } from '../shared/console-record.model';
import { HOURS } from '../shared/mock-hours';
import { Hour } from '../shared/hour.model';

@Component({
  selector: 'app-consoles-record',
  templateUrl: './consoles-record.component.html',
  styleUrls: ['./consoles-record.component.scss']
})
export class ConsolesRecordComponent implements OnInit {
  allConsoles: Console[] = [];
  consolesRecords: ConsoleRecord[] = [];
  hours = HOURS;

  selectedConsole: Console;
  selectedHour: Hour;
  errorConsole: Boolean = false;
  errorHour: Boolean = false;

  constructor(private consolesService: ConsolesService) { }

  trackByItems(index: number, consoleRecord: ConsoleRecord): string { return consoleRecord.id; }

  ngOnInit() {
    this.consolesService.getConsoles().subscribe(data => {
      this.allConsoles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Console;
      });
    });

    this.consolesService.getConsolesRecords().subscribe(data => {
      this.consolesRecords = data.map(e => {
        let newRecord = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
        newRecord.startDate = newRecord.startDate.toDate();
        newRecord.endDate = newRecord.endDate.toDate();
        return newRecord as ConsoleRecord;
      });
      this.consolesRecords.sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
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
    let newRecord = {
      startDate: now,
      endDate: endDate,
      console: this.selectedConsole,
      price: this.consolesService.getConsoleRecordPrice(now, endDate, this.selectedConsole.hourPrice, this.selectedConsole.halfHourPrice),
      finished: false,
      hours: this.selectedHour.hoursValue
    } as ConsoleRecord;
    this.createRecord(newRecord);
    this.selectedConsole = undefined;
    this.selectedHour = undefined;
  }

  getEndDate(now: Date): Date {
    return new Date(now.getTime() + this.selectedHour.hoursValue * 60 * 60 * 1000);
  }

  createRecord(record: ConsoleRecord): void {
    this.consolesService.createRecord(record, this.selectedConsole);
  }

}
