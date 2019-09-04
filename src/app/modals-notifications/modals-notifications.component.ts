import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsolesService } from '../consoles/shared/consoles.service';
import { ComputersService } from '../computers/computers.service';
import { ClientsService } from '../clients/clients.service';
import { Client } from 'src/app/clients/client.model';
import { HOURS } from '../consoles/shared/mock-hours';
import { Hour } from '../consoles/shared/hour.model';

@Component({
  selector: 'app-modals-notifications',
  templateUrl: './modals-notifications.component.html',
  styleUrls: ['./modals-notifications.component.scss']
})
export class ModalsNotificationsComponent implements OnInit {
  @ViewChild('consoleModal', { static: false }) private consoleModal;
  @ViewChild('computerModal', { static: false }) private computerModal;
  @ViewChild('endClientModal', { static: false }) private endClientModal;
  client: Client;
  consoleIndex: number;
  computerIndex: number;
  avaliableHours: Hour[] = HOURS;
  title: string;
  body: string;
  isEndTime: boolean = false;
  selectedHour: Hour = undefined;
  errorHour: boolean = false;

  constructor(
    private modalService: NgbModal,
    private consolesService: ConsolesService,
    private computersService: ComputersService,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.consolesService.consoleRecordEnd$.subscribe(
      consoleRecordEnd => {
        this.resetAll();
        this.isEndTime = true;
        this.client = consoleRecordEnd.client;
        this.consoleIndex = consoleRecordEnd.consoleIndex;
        let consoleName = consoleRecordEnd.client.consolesRecords[this.consoleIndex].console.name;
        let clientName = 'Cliente ' + consoleRecordEnd.client.counter;
        this.title = `Terminar ${consoleName} - ${clientName}`;
        this.body = `¿Quieres terminar el tiempo de la ${consoleName} - ${clientName}?`;
        this.modalService.open(this.consoleModal, { centered: true });
      }
    );

    this.consolesService.consoleRecordAddTime$.subscribe(
      consoleRecordAddTime => {
        this.resetAll();
        this.isEndTime = false;
        this.client = consoleRecordAddTime.client;
        this.consoleIndex = consoleRecordAddTime.consoleIndex;
        let consoleName = consoleRecordAddTime.client.consolesRecords[this.consoleIndex].console.name;
        let clientName = 'Cliente ' + consoleRecordAddTime.client.counter;
        this.title = `Agregar Tiempo del ${consoleName} - ${clientName}`;
        this.body = `¿Cuánto tiempo se va agregar a la ${consoleName} - ${clientName}?`;
        this.modalService.open(this.consoleModal, { centered: true });
      }
    );

    this.computersService.computerRecordEnd$.subscribe(
      computerRecordEnd => {
        this.resetAll();
        this.client = computerRecordEnd.client;
        this.computerIndex = computerRecordEnd.computerIndex;
        let computerName = computerRecordEnd.client.computersRecords[this.computerIndex].computer.name;
        let clientName = 'Cliente ' + computerRecordEnd.client.counter;
        this.title = `Terminar ${computerName} - ${clientName}`;
        this.body = `¿Quieres terminar el tiempo de la ${computerName} - ${clientName}? Se cobraran: ${computerRecordEnd.computerPrice} pesos`;
        this.modalService.open(this.computerModal, { centered: true });
      }
    );

    this.clientsService.clientEnd$.subscribe(
      client => {
        this.resetAll();
        this.client = client;
        this.modalService.open(this.endClientModal, { centered: true });
      }
    );
  }

  resetAll() {
    this.client = undefined;
    this.consoleIndex = undefined;
    this.avaliableHours = undefined;
    this.title = undefined;
    this.body = undefined;
    this.isEndTime = undefined;
    this.selectedHour = undefined;
    this.errorHour = undefined;
  }

  consoleEndTime() {
    this.modalService.dismissAll();
    this.consolesService.endConsoleRecord(this.client, this.consoleIndex);
  }

  consoleAddTime() {
    if (!this.selectedHour) {
      this.errorHour = true;
      return;
    }
    this.modalService.dismissAll();
    this.consolesService.addTimeConsoleRecord(this.client, this.consoleIndex, this.selectedHour);
    this.selectedHour = undefined;
  }

  computerEndTime() {
    this.modalService.dismissAll();
    this.computersService.endComputerRecord(this.client, this.computerIndex);
  }

  endClient() {
    this.modalService.dismissAll();
    if(this.client.consolesRecords){
      this.consolesService.endAllConsolesRecords(this.client);
    }
    if(this.client.computersRecords){
      this.computersService.endAllComputersRecords(this.client);
    }
    this.clientsService.endClient(this.client);
  }

}