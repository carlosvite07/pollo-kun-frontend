import { Component, OnChanges, Input } from '@angular/core';
import { ConsoleRecord } from '../shared/console-record.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsolesService } from '../shared/consoles.service';
import { ModalService } from '../shared/consoles-modal.service';
import { ConsolesModalComponent } from '../consoles-modal/consoles-modal.component';
import { Hour } from '../shared/hour.model';

@Component({
  selector: 'app-consoles-show',
  templateUrl: './consoles-show.component.html',
  styleUrls: ['./consoles-show.component.scss']
})
export class RecordComponent implements OnChanges {
  @Input() consoleRecord: ConsoleRecord;

  modalReference;
  warningAlert;
  endInitially;
  beforeFinishedMinutesAlert: number = 5;

  constructor(
    private externalModal: NgbModal,
    private consolesService: ConsolesService,
    private modalService: ModalService
  ) {
    this.modalService.endRecordId$.subscribe(
      consoleRecordId => {
        if (consoleRecordId === this.consoleRecord.id) {
          this.endRecord(this.consoleRecord);
        }
      }
    );

    this.modalService.selectedHour$.subscribe(
      hour => {
        if (hour.consoleRecordId === this.consoleRecord.id) {
          this.addTime(hour.selectedHour);
        }
      }
    );
  }

  ngOnChanges() {
    clearTimeout(this.warningAlert);
    clearTimeout(this.endInitially);
    let now = new Date();

    this.externalModal.dismissAll();
    
    this.warningAlert = setTimeout(() => {
      this.showExternalModal(this.consoleRecord.console.name,
        'Le quedan menos de ' + this.beforeFinishedMinutesAlert + ' minutos para que termine el ' + this.consoleRecord.console.name, false, false);
    }, this.consoleRecord.endDate.getTime() - (now.getTime() + this.beforeFinishedMinutesAlert * 60 * 1000));

    this.endInitially = setTimeout(() => {
      this.endRecord(this.consoleRecord);
    }, this.consoleRecord.endDate.getTime() - now.getTime());
  }

  endRecord(consoleRecord: ConsoleRecord): void {
    this.externalModal.dismissAll();
    clearTimeout(this.warningAlert);
    clearTimeout(this.endInitially);
    this.consolesService.endConsoleRecord(consoleRecord);
  }

  endConfirm(): void {
    this.showExternalModal(this.consoleRecord.console.name, '¿Estas seguro que quieres terminar el tiempo de ' + this.consoleRecord.console.name + '?', true, false);
  }

  addTimeConfirm(): void {
    this.showExternalModal(this.consoleRecord.console.name, '¿Cuanto tiempo quieres agregar al ' + this.consoleRecord.console.name + '?', false, true);
  }

  addTime(hour: Hour): void {
    this.externalModal.dismissAll();
    clearTimeout(this.warningAlert);
    clearTimeout(this.endInitially);
    this.consoleRecord.endDate = new Date(this.consoleRecord.endDate.getTime() + hour.hoursValue * 60 * 60 * 1000);
    this.consoleRecord.hours += hour.hoursValue;
    this.consolesService.addTime(this.consoleRecord);
  }

  showExternalModal(title: string, body: string, isEndRecord: boolean, isAddTime: boolean): void {
    this.modalReference = this.externalModal.open(ConsolesModalComponent, { centered: true });
    this.modalReference.componentInstance.title = title;
    this.modalReference.componentInstance.body = body;
    this.modalReference.componentInstance.consoleRecordId = this.consoleRecord.id;
    if (isEndRecord) {
      this.modalReference.componentInstance.isEndRecord = true;
    }
    if (isAddTime) {
      this.modalReference.componentInstance.isAddTime = true;
    }
  }

}
