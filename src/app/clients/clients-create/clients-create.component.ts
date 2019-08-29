import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';
import { ConsolesService } from '../../consoles/shared/consoles.service';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients-create.component.scss']
})
export class ClientsComponent implements OnInit {
  allClients: Client[] = [];
  clientsCounter: number = 0;
  selectedClient: Client;
  

  constructor(
    private clientsService: ClientsService,
    private consolesService: ConsolesService
  ) {}

  ngOnInit() {
    let now = new Date();
    let startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    
    //Finish Old Clients
    this.clientsService.getOldClients(startDate).subscribe(oldClients =>{
      oldClients.forEach(oldClient => {
        let clientId = oldClient.payload.doc.id;
        let clientData = oldClient.payload.doc.data() as any;
        let client = {
          id: clientId,
          ...clientData
        } as Client;
        client.startDate = clientData.startDate.toDate();
        this.clientsService.finishClient(client);
      })
    });

    //Get Current Clients
    this.clientsService.getClients(startDate).subscribe(todayClients => {
      this.allClients = [];
      this.clientsCounter = todayClients.length;
      let selectedClient = false;
      todayClients.forEach(todayClient => {
        let clientId = todayClient.payload.doc.id;
        let clientData = todayClient.payload.doc.data() as any;
        let client = {
          id: clientId,
          ...clientData
        } as Client;
        if(client.consolesRecords) {
          client.consolesRecords.map((consoleRecord, index) => {
            consoleRecord.startDate = clientData.consolesRecords[index].startDate.toDate();
            consoleRecord.endDate = clientData.consolesRecords[index].endDate.toDate();
          });
          client.consolesRecords.forEach((consoleRecord, consoleIndex) => {
            if (consoleRecord.endDate < now && !consoleRecord.finished) {
              this.consolesService.endConsoleRecord(client, consoleIndex);
            }else{
              
            }
          });
        }
        if (!client.finished) {
          if (!selectedClient) {
            selectedClient = true;
            this.selectedClient = client;
          }
        }
        this.allClients.push(client);
      });
      this.clientsService.setActiveClients(this.allClients);
    });

  }

  create(): void {
    let now = new Date();
    let newClient = {
      counter: ++this.clientsCounter,
      startDate: now,
      finished: false
    } as Client;
    this.clientsService.create(newClient);
    this.selectedClient = undefined;
  }

}



/*
execute function every second

getActiveClients = {
  Array de consolas ocupadas .unshift(consolas)
}

consoleRecord = {
  console: Console
  notification: {

  }
}

Array de notificaciones

notifications = {
  id: string;
  body: string;
  closed: boolean,
}
*/