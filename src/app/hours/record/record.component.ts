import { Component, OnChanges, Input } from '@angular/core';
import { Record } from '../shared/record.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecordService } from '../shared/record.service';
import { ModalService } from '../../shared/modal-component/modal.service';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { Hour } from '../shared/hour.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnChanges {
  @Input() record: Record;

  modalReference;
  warningAlert;
  endInitially;

  constructor(
    private externalModal: NgbModal,
    private recordService: RecordService,
    private modalService: ModalService
  ) {
      this.modalService.endRecordId$.subscribe(
        recordId => {
          if(recordId === this.record.id){
            this.endRecord(this.record);
          }
        }
      );

      this.modalService.selectedHour$.subscribe(
        hour => {
          if(hour.recordId === this.record.id){
            this.addTime(hour.selectedHour);
          }
        }
      );
  }

  ngOnChanges(){
    clearTimeout(this.warningAlert);
    clearTimeout(this.endInitially);
    let now = new Date();

    this.warningAlert = setTimeout(() => {
      this.modalReference = this.externalModal.open(ModalComponentComponent, { centered: true });
      this.modalReference.componentInstance.title = this.record.console.name;
      this.modalReference.componentInstance.body = 'Le quedan menos de 10 minutos para que termine el ' + this.record.console.name;
    }, this.record.endDate.getTime() - (now.getTime() + 10 * 60 * 1000));

    this.endInitially = setTimeout(() => {
      this.endRecord(this.record);
    }, this.record.endDate.getTime() - now.getTime());
  }


  endRecord(record: Record): void {
    this.externalModal.dismissAll();
    clearTimeout(this.warningAlert);
    clearTimeout(this.endInitially);
    this.recordService.endRecord(record);
  }

  endConfirm(record: Record): void {
    this.modalReference = this.externalModal.open(ModalComponentComponent, { centered: true });
    this.modalReference.componentInstance.title = this.record.console.name;
    this.modalReference.componentInstance.body = '¿Estas seguro que quieres terminar el tiempo de ' + record.console.name + '?';
    this.modalReference.componentInstance.recordId = this.record.id;
    this.modalReference.componentInstance.isEndRecord = true;
  }

  addTimeConfirm(record: Record): void {
    this.modalReference = this.externalModal.open(ModalComponentComponent, { centered: true });
    this.modalReference.componentInstance.title = this.record.console.name;
    this.modalReference.componentInstance.body = '¿Cuanto tiempo quieres agregar al ' + record.console.name + '?';
    this.modalReference.componentInstance.recordId = this.record.id;
    this.modalReference.componentInstance.isAddTime = true;
  }

  addTime(hour: Hour): void {
    this.externalModal.dismissAll();
    clearTimeout(this.warningAlert);
    clearTimeout(this.endInitially);
    this.record.endDate = new Date(this.record.endDate.getTime() + hour.hoursValue * 60 * 60 * 1000);
    this.recordService.addTime(this.record);
  }

  showExternalModal(title:string,body:string):void{

  }

}
