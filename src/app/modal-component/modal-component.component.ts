import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HOURS } from '../mock-hours';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent{

  @Input() title;
  @Input() body;
  @Input() register;

  hours =  HOURS;

  constructor(
    private activeModal: NgbActiveModal, 
    private modalService: ModalService
  ) { }

  endRecord(){
    this.register
    this.modalService.endRecord(this.register);
  }
}
