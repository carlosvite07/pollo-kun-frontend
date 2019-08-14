import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Record } from '../record.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HOURS } from '../mock-hours';
import { Hour } from '../hour';
import { RecordService } from '../record.service';
import { ModalComponentComponent } from '../modal-component/modal-component.component';

// import { RecordService } from '../record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Input() record: Record;

  constructor(private modalService: NgbModal, private recordService: RecordService) { }
  // constructor(private recordService: RecordService) { }

  modalBody: String = '';
  modalReference;
  selectedHour: Hour;
  avaliableHours = HOURS;
  errorHour = false;

  ngOnInit() {
    // TODO modal implementations
    
    let now = new Date();
    
    setTimeout(() => {
      this.modalReference = this.modalService.open(ModalComponentComponent, { centered: true });
      this.modalReference.componentInstance.title = this.record.console.name;
      this.modalReference.componentInstance.body = 'Le quedan menos de 10 minutos para que termine el '+this.record.console.name;
    }, this.record.endDate.getTime() - (now.getTime() + 59 * 60 * 1000));

    setTimeout(() => {
      this.endRecord(this.record);
    }, this.record.endDate.getTime() - now.getTime());

  }

  endRecord(record: Record): void {
    this.modalService.dismissAll();
    this.recordService.endRecord(record);
  }

  endConfirm(record: Record, content): void {
    let text = '¿Estas seguro que quieres terminar el tiempo de ' + record.console.name + '?';
    this.showModal(text, content);
  }

  showModal(modalBody: String, content): void {
    this.modalBody = modalBody;
    this.modalReference = this.modalService.open(content);
  }

  addTimeConfirm(record: Record, content): void {
    let text = '¿Cuanto tiempo quieres agregar al ' + record.console.name + '?';
    this.showModal(text, content);
  }

  addTime(record: Record): void {
    this.errorHour = (this.selectedHour) ? false : true;
    if (this.errorHour) {
      return;
    }
    this.modalService.dismissAll();
    record.endDate = new Date(record.endDate.getTime() + this.selectedHour.hoursValue * 60 * 60 * 1000);
    this.selectedHour = undefined;
  }

}
