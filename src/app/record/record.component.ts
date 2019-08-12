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
  @Output() voted = new EventEmitter<boolean>();
  @Output() endRecord = new EventEmitter<number>();

  didVote = false;

  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }

  constructor(private recordService: RecordService) { }

  ngOnInit() {
  }

  end(idRecord: number): void {
    console.log('end')
    this.endRecord.emit(idRecord);
  }

}
