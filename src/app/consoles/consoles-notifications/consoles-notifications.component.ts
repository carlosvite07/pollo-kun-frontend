import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsolesService } from '../shared/consoles.service';
import { Client } from 'src/app/clients/client.model';
import { HOURS } from '../shared/mock-hours';
import { Hour } from '../shared/hour.model';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-consoles-notifications',
  templateUrl: './consoles-notifications.component.html',
  styleUrls: ['./consoles-notifications.component.scss']
})
export class ConsolesNotificationsComponent implements OnInit {
  @ViewChild('content', { static: false }) private content;
  client: Client;
  consoleIndex: number;
  avaliableHours: Hour[] = HOURS;
  title: string;
  body: string;
  isEndTime: boolean = false;
  selectedHour: Hour = undefined;
  errorHour: boolean = false;

  constructor(
    private modalService: NgbModal,
    private consolesService: ConsolesService,
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.consolesService.consoleRecordEnd$.subscribe(
      consoleRecordEnd => {
        this.isEndTime = true;
        this.client = consoleRecordEnd.client;
        this.consoleIndex = consoleRecordEnd.consoleIndex;
        let consoleName = consoleRecordEnd.client.consolesRecords[this.consoleIndex].console.name;
        let clientName = 'Cliente ' + consoleRecordEnd.client.counter;
        this.title = `Terminar ${consoleName} - ${clientName}`;
        this.body = `¿Quieres terminar el tiempo de la ${consoleName} - ${clientName}?`;
        this.modalService.open(this.content, { centered: true });
      }
    );

    this.consolesService.consoleRecordAddTime$.subscribe(
      consoleRecordAddTime => {
        this.isEndTime = false;
        this.client = consoleRecordAddTime.client;
        this.consoleIndex = consoleRecordAddTime.consoleIndex;
        let consoleName = consoleRecordAddTime.client.consolesRecords[this.consoleIndex].console.name;
        let clientName = 'Cliente ' + consoleRecordAddTime.client.counter;
        this.title = `Agregar Tiempo del ${consoleName} - ${clientName}`;
        this.body = `¿Cuánto tiempo se va agregar a la ${consoleName} - ${clientName}?`;
        this.modalService.open(this.content, { centered: true });
      }
    );

    let startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    //busyConsoles
  }

  endTime() {
    this.modalService.dismissAll();
    this.consolesService.endConsoleRecord(this.client, this.consoleIndex);
  }

  addTime() {
    if (!this.selectedHour) {
      this.errorHour = true;
      return;
    }
    this.modalService.dismissAll();
    this.consolesService.addTimeConsoleRecord(this.client, this.consoleIndex,this.selectedHour);
    this.selectedHour = undefined;
  }

  //execute all time every second
  //Recorrer busyconsoles if endDate < now then terminar


}