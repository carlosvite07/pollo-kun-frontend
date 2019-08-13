import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Record } from '../record';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HOURS } from '../mock-hours';
import { Hour } from '../hour';

// import { RecordService } from '../record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;
  @Output() endRecord = new EventEmitter<Record>();
  @Output() updateRecords = new EventEmitter<Record>();
  @ViewChild('content', { static: false }) private childContent;

  constructor(private modalService: NgbModal) { }
  // constructor(private recordService: RecordService) { }

  modalBody: String = '';
  modalReference;
  selectedHour: Hour;
  avaliableHours = HOURS;
  errorHour = false;

  ngOnInit() {
    setTimeout(() => {
      let message = `El ${this.record.selectedConsole.id} ${this.record.selectedConsole.name} terminara en 10 min pregunta al cliente si desea más tiempo`;
      this.modalReference = this.showModal(message, this.childContent);
    }, 10 * 60 * 1000);

    setTimeout(() => {
      this.modalService.dismissAll();
      this.endRecord.emit(this.record);
    }, 20 * 60 * 1000);
    // }, this.record.endDate.getTime() - this.record.startDate.getTime());
  }

  showModal(modalBody: String, content): void {
    this.modalBody = modalBody;
    this.modalReference = this.modalService.open(content);
  }

  endConfirm(record: Record, content): void {
    let text = '¿Estas seguro que quieres terminar el tiempo de ' + record.selectedConsole.id + ' ' + record.selectedConsole.name + '?';
    this.showModal(text, content);
  }

  end(record: Record, content): void {
    // this.modalService.dismissAll();
    this.modalReference.close();
    this.endRecord.emit(record);
  }

  addTimeConfirm(record: Record, content): void {
    let text = '¿Cuanto tiempo quieres agregar al ' + record.selectedConsole.id + ' ' + record.selectedConsole.name + '?';
    this.showModal(text, content);
  }

  addTime(record: Record): void{
    this.errorHour = (this.selectedHour) ? false : true;
    if (this.errorHour) {
      return;
    }
    this.modalService.dismissAll();
    record.endDate = new Date(record.endDate.getTime()+this.selectedHour.hoursValue*60*60*1000);
    this.selectedHour = undefined;
    this.updateRecords.emit(record);
  }

}
