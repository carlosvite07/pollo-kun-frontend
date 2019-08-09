import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;

  constructor(private recordService: RecordService) { }

  ngOnInit() {
  }

  endRecord(record: Record): void{
    console.log(record)
    this.recordService.endRecord(record.selectedConsole.id);
  }

}
