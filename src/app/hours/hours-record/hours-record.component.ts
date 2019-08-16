import { Component, OnInit } from '@angular/core';
import { RecordService } from '../shared/record.service';
import { HOURS } from '../shared/mock-hours';
import { Console } from '../shared/console.model';
import { Hour } from '../shared/hour.model';
import { Record } from '../shared/record.model';

@Component({
  selector: 'app-hours-record',
  templateUrl: './hours-record.component.html',
  styleUrls: ['./hours-record.component.scss']
})
export class HoursRecordComponent implements OnInit {
  allConsoles: Console[] = [];
  records: Record[] = [];
  avaliableHours = HOURS;

  selectedConsole: Console;
  selectedHour: Hour;
  errorConsole: Boolean = false;
  errorHour: Boolean = false;

  constructor(private recordService: RecordService) { }

  trackByItems(index: number, record: Record): string { return record.id; }

  ngOnInit() {
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
      });
      this.records.sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
    });
  }

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
      price: this.recordService.getRecordPrice(now, endDate, this.selectedConsole.hourPrice, this.selectedConsole.halfHourPrice),
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
    this.recordService.createRecord(record, this.selectedConsole);
  }

  updateAvaliableConsoles(): void {
    this.recordService.updateConsole(this.selectedConsole);
  }

  // ngOnDestroy(){
  //   this.recordService.getConsoles().unsubscribe();
  //   this.recordService.getRecords().unsubscribe();
  // }
}
