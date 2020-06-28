import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from '../articles/articles.service';
import { ConsolesService } from '../consoles/shared/consoles.service';
import { CandiesService } from '../candies/candies.service';
import { ComputersService } from '../computers/computers.service';
import { WorksService } from '../works/works.service';
import { ClientsService } from '../clients/clients.service';
import { Client } from 'src/app/clients/client.model';
import { HOURS } from '../consoles/shared/mock-hours';
import { Hour } from '../consoles/shared/hour.model';
import { HOURS as HOURSCOMPUTER } from '../computers/mock-hours';
import { Hour as HourComputer } from '../computers/hour.model';
import { Console } from '../consoles/shared/console.model';

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
  debt: number = 0;
  consoleIndex: number;
  computerIndex: number;
  avaliableConsoles: Console[] = [];
  avaliableHours: Hour[] = HOURS;
  avaliableHoursComputer: Hour[] = HOURSCOMPUTER;
  title: string;
  body: string;
  isEndTime: boolean = false;
  isConsoleChange: boolean = false;
  isAddTime: boolean = false;
  isLessTime: boolean = false;
  selectedHour: Hour = undefined;
  selectedHourComputer: HourComputer = undefined;
  selectedConsole: Console = undefined;
  errorConsole: boolean = false;
  errorHour: boolean = false;
  errorLessHour: boolean = false;

  constructor(
    private modalService: NgbModal,
    private articlesService: ArticlesService,
    private consolesService: ConsolesService,
    private candiesService: CandiesService,
    private computersService: ComputersService,
    private worksService: WorksService,
    private clientsService: ClientsService
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

    this.consolesService.consoleRecordEnd$.subscribe(consoleRecordEnd => {
      this.resetAll();
      this.isEndTime = true;
      this.client = consoleRecordEnd.client;
      this.consoleIndex = consoleRecordEnd.consoleIndex;
      let consoleName =
        consoleRecordEnd.client.consolesRecords[this.consoleIndex].console.name;
      let clientName = 'Cliente ' + consoleRecordEnd.client.counter;
      this.title = `Terminar ${consoleName} - ${clientName}`;
      this.body = `¿Quieres terminar el tiempo de la ${consoleName} - ${clientName}?`;
      this.modalService.open(this.consoleModal, { centered: true });
    });

    this.consolesService.consoleRecordChange$.subscribe(consoleRecordChange => {
      this.resetAll();
      this.isConsoleChange = true;
      this.client = consoleRecordChange.client;
      this.consoleIndex = consoleRecordChange.consoleIndex;
      let consoleName =
        consoleRecordChange.client.consolesRecords[this.consoleIndex].console
          .name;
      let clientName = 'Cliente ' + consoleRecordChange.client.counter;
      this.title = `Cambiar la consola ${consoleName} - ${clientName}`;
      this.body = `¿Por cuál consola desea cambiar la ${consoleName} del ${clientName}?`;
      this.modalService.open(this.consoleModal, { centered: true });
    });

    this.consolesService.consoleRecordAddTime$.subscribe(
      consoleRecordAddTime => {
        this.resetAll();
        this.isAddTime = true;
        this.client = consoleRecordAddTime.client;
        this.consoleIndex = consoleRecordAddTime.consoleIndex;
        let consoleName =
          consoleRecordAddTime.client.consolesRecords[this.consoleIndex].console
            .name;
        let clientName = 'Cliente ' + consoleRecordAddTime.client.counter;
        this.title = `Agregar Tiempo del ${consoleName} - ${clientName}`;
        this.body = `¿Cuánto tiempo se va agregar a la ${consoleName} - ${clientName}?`;
        this.modalService.open(this.consoleModal, { centered: true });
      }
    );

    this.consolesService.consoleRecordLessTime$.subscribe(
      consoleRecordLessTime => {
        this.resetAll();
        this.isLessTime = true;
        this.client = consoleRecordLessTime.client;
        this.consoleIndex = consoleRecordLessTime.consoleIndex;
        let consoleName =
          consoleRecordLessTime.client.consolesRecords[this.consoleIndex]
            .console.name;
        let clientName = 'Cliente ' + consoleRecordLessTime.client.counter;
        this.title = `Reducir Tiempo del ${consoleName} - ${clientName}`;
        this.body = `¿Cuánto tiempo se va a reducir de la ${consoleName} - ${clientName}?`;
        this.modalService.open(this.consoleModal, { centered: true });
      }
    );

    this.computersService.computerRecordEnd$.subscribe(computerRecordEnd => {
      this.resetAll();
      this.isEndTime = true;
      this.client = computerRecordEnd.client;
      this.computerIndex = computerRecordEnd.computerIndex;
      const computerName =
        computerRecordEnd.client.computersRecords[this.computerIndex].computer
          .name;
      const clientName = 'Cliente ' + computerRecordEnd.client.counter;
      this.title = `Terminar ${computerName} - ${clientName}`;
      this.body = `¿Quieres terminar el tiempo de la ${computerName} - ${clientName}? Se cobraran: ${computerRecordEnd.computerPrice} pesos`;
      this.modalService.open(this.computerModal, { centered: true });
    });

    this.computersService.computerRecordAddTime$.subscribe(
      computerRecordAddTime => {
        this.resetAll();
        this.isAddTime = true;
        this.client = computerRecordAddTime.client;
        this.computerIndex = computerRecordAddTime.computerIndex;
        let computerName =
          computerRecordAddTime.client.computersRecords[this.computerIndex]
            .computer.name;
        let clientName = 'Cliente ' + computerRecordAddTime.client.counter;
        this.title = `Agregar Tiempo del ${computerName} - ${clientName}`;
        this.body = `¿Cuánto tiempo se va agregar a la ${computerName} - ${clientName}?`;
        this.modalService.open(this.computerModal, { centered: true });
      }
    );

    this.computersService.computerRecordLessTime$.subscribe(
      computerRecordLessTime => {
        this.resetAll();
        this.isLessTime = true;
        this.client = computerRecordLessTime.client;
        this.computerIndex = computerRecordLessTime.computerIndex;
        let computerName =
          computerRecordLessTime.client.computersRecords[this.computerIndex]
            .computer.name;
        let clientName = 'Cliente ' + computerRecordLessTime.client.counter;
        this.title = `Reducir Tiempo del ${computerName} - ${clientName}`;
        this.body = `¿Cuánto tiempo se va a reducir de la ${computerName} - ${clientName}?`;
        this.modalService.open(this.computerModal, { centered: true });
      }
    );

    this.clientsService.clientEnd$.subscribe(client => {
      this.resetAll();
      this.client = client.client;
      this.debt = client.debt;
      this.modalService.open(this.endClientModal, { centered: true });
    });
  }

  resetAll() {
    this.client = undefined;
    this.debt = 0;
    this.consoleIndex = undefined;
    this.computerIndex = undefined;
    this.title = undefined;
    this.body = undefined;
    this.isEndTime = false;
    this.isConsoleChange = false;
    this.isAddTime = false;
    this.isLessTime = false;
    this.selectedHour = undefined;
    this.selectedHourComputer = undefined;
    this.selectedConsole = undefined;
    this.errorHour = undefined;
    this.errorConsole = undefined;
    this.errorLessHour = false;
  }

  consoleEndTime() {
    this.modalService.dismissAll();
    this.consolesService.endConsoleRecord(this.client, this.consoleIndex);
  }

  consoleChange() {
    if (!this.selectedConsole) {
      this.errorConsole = true;
      return;
    }
    this.modalService.dismissAll();
    this.consolesService.changeConsoleRecord(
      this.client,
      this.consoleIndex,
      this.selectedConsole
    );
    this.selectedConsole = undefined;
  }

  consoleAddTime() {
    if (!this.selectedHour) {
      this.errorHour = true;
      return;
    }
    this.modalService.dismissAll();
    this.consolesService.addTimeConsoleRecord(
      this.client,
      this.consoleIndex,
      this.selectedHour
    );
    this.selectedHour = undefined;
  }

  consoleLessTime() {
    if (!this.selectedHour) {
      this.errorHour = true;
      return;
    }
    let now = new Date();
    let updatedDate = new Date(
      this.client.consolesRecords[this.consoleIndex].endDate.getTime() -
        this.selectedHour.hoursValue * 60 * 60 * 1000
    );
    if (updatedDate < now) {
      this.errorLessHour = true;
      setTimeout(() => {
        this.errorLessHour = false;
      }, 5000);
      return;
    } else {
      this.modalService.dismissAll();
      this.consolesService.lessTimeConsoleRecord(
        this.client,
        this.consoleIndex,
        this.selectedHour
      );
      this.selectedHour = undefined;
    }
  }

  computerEndTime() {
    this.modalService.dismissAll();
    this.computersService.endComputerRecord(this.client, this.computerIndex);
  }

  computerAddTime() {
    if (!this.selectedHourComputer) {
      this.errorHour = true;
      return;
    }
    this.modalService.dismissAll();
    this.computersService.addTimeComputerRecord(
      this.client,
      this.computerIndex,
      this.selectedHourComputer
    );
    this.selectedHourComputer = undefined;
  }

  computerLessTime() {
    if (!this.selectedHourComputer) {
      this.errorHour = true;
      return;
    }
    let now = new Date();
    let updatedDate = new Date(
      this.client.computersRecords[this.computerIndex].endDate.getTime() -
        this.selectedHourComputer.hoursValue * 60 * 60 * 1000
    );
    if (updatedDate < now) {
      this.errorLessHour = true;
      setTimeout(() => {
        this.errorLessHour = false;
      }, 5000);
      return;
    } else {
      this.modalService.dismissAll();
      this.computersService.lessTimeComputerRecord(
        this.client,
        this.computerIndex,
        this.selectedHourComputer
      );
      this.selectedHourComputer = undefined;
    }
  }

  endClient() {
    this.modalService.dismissAll();
    //Articles
    if (
      this.client.articlesPurchases &&
      this.client.articlesPurchases.length > 0
    ) {
      this.articlesService.endAllArticlesPurchases(this.client);
    }
    //Consoles
    if (this.client.consolesRecords) {
      this.consolesService.endAllConsolesRecords(this.client);
    }
    //Candies
    if (
      this.client.candiesPurchases &&
      this.client.candiesPurchases.length > 0
    ) {
      this.candiesService.endAllCandiesPurchases(this.client);
    }
    //Computers
    if (
      this.client.computersRecords &&
      this.client.computersRecords.length > 0
    ) {
      this.computersService.endAllComputersRecords(this.client);
    }
    //Works
    if (this.client.worksRecords) {
      this.worksService.endAllWorksRecords(this.client);
    }
    this.clientsService.endClient(this.client);
  }
}
