import { Component, Input } from '@angular/core';
import { HOURS } from '../shared/mock-hours';
import { Hour } from '../shared/hour.model';
import { ModalService } from '../shared/consoles-modal.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consoles-modal',
  templateUrl: './consoles-modal.component.html',
  styleUrls: ['./consoles-modal.component.scss']
})
export class ConsolesModalComponent {

  @Input() title;
  @Input() body;
  @Input() consoleRecordId;

  @Input() isAddTime;
  @Input() isEndRecord;

  avaliableHours: Hour[] = HOURS;
  selectedHour: Hour;
  errorHour: boolean = false;

  constructor(
    private modalService: ModalService,
    public activeModal: NgbActiveModal
  ) { }

  confirmEndRecord(): void {
    this.modalService.confirmEndRecord(this.consoleRecordId);
  }

  confirmAddTime(): void {
    this.errorHour = (this.selectedHour) ? false : true;
    if (this.errorHour) {
      return;
    }
    let object = {
      'selectedHour': this.selectedHour,
      'consoleRecordId': this.consoleRecordId,
    }
    this.modalService.confirmAddTime(object);
  }

}
