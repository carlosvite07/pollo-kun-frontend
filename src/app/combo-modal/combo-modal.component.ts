import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from '../combo/combo.service';
import { ConsolesService } from '../consoles/shared/consoles.service';
import { CandiesService } from '../candies/candies.service';
import { ClientsService } from '../clients/clients.service';
import { Client } from 'src/app/clients/client.model';
import { HOURS } from '../consoles/shared/mock-hours';
import { Hour } from '../consoles/shared/hour.model';

@Component({
  selector: 'app-combo-modal',
  templateUrl: './combo-modal.component.html',
  styleUrls: ['./combo-modal.component.scss']
})
export class ComboModalComponent implements OnInit {
  @ViewChild('comboModal', { static: false }) private comboModal;
  client: Client;
  debt: number = 0;
  consoleIndex: number;
  avaliableConsoles: Console[] = [];
  avaliableHours: Hour[] = HOURS;
  title: string;
  body: string;
  selectedHour: Hour = undefined;
  selectedConsole: Console = undefined;
  errorConsole: boolean = false;
  errorHour: boolean = false;
  errorLessHour: boolean = false;

  constructor(
    private modalService: NgbModal,
    private consolesService: ConsolesService,
    private candiesService: CandiesService,
    private clientsService: ClientsService,
    private comboService: ComboService
  ) {}

  ngOnInit() {
    this.consolesService.getConsoles().subscribe(data => {
      this.avaliableConsoles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Console;
      });
    });

    this.comboService.comboShowModal$.subscribe(combo => {
      // this.resetAll();
      this.client = combo.client;
      this.consoleIndex = combo.consoleIndex;
      this.title = 'Selecciona la consola y el refresco';
      this.modalService.open(this.comboModal, { centered: true });
    });
  }
}
