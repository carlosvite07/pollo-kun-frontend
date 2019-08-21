import { Component, Input } from '@angular/core';
import { HOURS } from '../../hours/shared/mock-hours';
import { Hour } from '../../hours/shared/hour.model';
import { ModalService } from './modal.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandiesService } from 'src/app/candies/candies.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent {

  @Input() title;
  @Input() body;
  @Input() recordId;

  @Input() isAddTime;
  @Input() isEndRecord;
  @Input() candiePurchase;

  avaliableHours: Hour[] = HOURS;
  selectedHour: Hour;
  errorHour: boolean = false;

  constructor(
    private modalService: ModalService,
    public activeModal: NgbActiveModal,
    private CandiesService: CandiesService
  ) { }

  confirmEndRecord(): void {
    this.modalService.confirmEndRecord(this.recordId);
  }

  confirmAddTime(): void {
    this.errorHour = (this.selectedHour) ? false : true;
    if (this.errorHour) {
      return;
    }
    let object = {
      'selectedHour': this.selectedHour,
      'recordId': this.recordId,
    }
    this.modalService.confirmAddTime(object);
  }

  confirmCandiePurchase(): void {
    this.CandiesService.candiePurchase(this.candiePurchase);
  }

}
