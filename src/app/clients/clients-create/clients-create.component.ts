import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';
import { ArticlesService } from '../../articles/articles.service';
import { CandiesService } from '../../candies/candies.service';
import { ConsolesService } from '../../consoles/shared/consoles.service';
import { ComputersService } from '../../computers/computers.service';
import { WorksService } from '../../works/works.service';
import { ElectronicsService } from '../../electronics/electronics.service';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients-create.component.scss']
})
export class ClientsComponent implements OnInit {
  allClients: Client[] = [];
  clientsCounter: number = 0;
  selectedClient: Client;
  clientAlias: '';

  constructor(
    private clientsService: ClientsService,
    private articlesService: ArticlesService,
    private candiesService: CandiesService,
    private consolesService: ConsolesService,
    private computersService: ComputersService,
    private worksService: WorksService,
    private electronicsService: ElectronicsService
  ) {}

  ngOnInit() {
    let now = new Date();
    let startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    //Finish Old Clients
    this.clientsService.getOldClients(startDate).subscribe(oldClients => {
      oldClients.forEach(oldClient => {
        let clientId = oldClient.payload.doc.id;
        let clientData = oldClient.payload.doc.data() as any;
        let client = {
          id: clientId,
          ...clientData
        };
        client.startDate = clientData.startDate.toDate();
        if (client.articlesPurchases && client.articlesPurchases.length > 0) {
          this.articlesService.endAllArticlesPurchases(client as Client);
        }
        if (
          client.electronicsPurchases &&
          client.electronicsPurchases.length > 0
        ) {
          this.electronicsService.endAllElectronicsPurchases(client as Client);
        }
        if (client.candiesPurchases && client.candiesPurchases.length > 0) {
          this.candiesService.endAllCandiesPurchases(client as Client);
        }
        if (client.worksRecords) {
          this.worksService.endAllWorksRecords(client as Client);
        }
        if (client.consolesRecords) {
          this.consolesService.endAllConsolesRecords(client as Client);
        }
        if (client.computersRecords) {
          client.computersRecords.forEach((el, index) => {
            if (client.computersRecords[index].startDate) {
              client.computersRecords[index].startDate = el.startDate.toDate();
            }
            if (client.computersRecords[index].endDate) {
              client.computersRecords[index].endDate = el.endDate.toDate();
            }
          });
          this.computersService.endAllComputersRecords(client as Client);
        }
        this.clientsService.finishClient(client as Client);
      });
    });

    //Get Current Clients
    this.clientsService.getClients(startDate).subscribe(todayClients => {
      this.allClients = [];
      this.clientsCounter = todayClients.length;
      this.selectedClient = undefined;
      todayClients.forEach(todayClient => {
        let clientId = todayClient.payload.doc.id;
        let clientData = todayClient.payload.doc.data() as any;
        let client = {
          id: clientId,
          ...clientData
        } as Client;
        if (client.consolesRecords) {
          client.consolesRecords.map((consoleRecord, index) => {
            consoleRecord.startDate = clientData.consolesRecords[
              index
            ].startDate.toDate();
            consoleRecord.endDate = clientData.consolesRecords[
              index
            ].endDate.toDate();
          });
          client.consolesRecords.forEach((consoleRecord, consoleIndex) => {
            if (consoleRecord.endDate < now && !consoleRecord.finished) {
              this.consolesService.endConsoleRecord(client, consoleIndex);
            }
          });
        }
        if (client.candiesPurchases) {
          client.candiesPurchases.map((candieRecord, index) => {
            candieRecord.date = clientData.candiesPurchases[
              index
            ].date.toDate();
          });
        }
        if (client.computersRecords) {
          client.computersRecords.map((computerRecord, index) => {
            computerRecord.startDate = clientData.computersRecords[
              index
            ].startDate.toDate();
            if (computerRecord.endDate) {
              computerRecord.endDate = clientData.computersRecords[
                index
              ].endDate.toDate();
            }
          });
        }
        if (client.worksRecords) {
          client.worksRecords.map((workRecord, index) => {
            workRecord.date = clientData.worksRecords[index].date.toDate();
          });
        }
        if (client.articlesPurchases) {
          client.articlesPurchases.map((articleRecord, index) => {
            articleRecord.date = clientData.articlesPurchases[
              index
            ].date.toDate();
          });
        }
        if (client.electronicsPurchases) {
          client.electronicsPurchases.map((electronicRecord, index) => {
            electronicRecord.date = clientData.electronicsPurchases[
              index
            ].date.toDate();
          });
        }
        if (!client.finished) {
          if (client.selected) {
            this.selectedClient = client;
          }
          this.allClients.push(client);
        }
      });
      this.clientsService.setActiveClients(this.allClients);
    });
  }

  create(): void {
    if (this.clientAlias === undefined) {
      this.clientAlias = '';
    }
    let now = new Date();
    this.clientsService.setSelectedClient(this.allClients, null);
    let newClient = {
      alias: this.clientAlias,
      counter: ++this.clientsCounter,
      startDate: now,
      finished: false,
      selected: true
    } as Client;
    this.clientsService.create(newClient);
    this.clientAlias = '';
  }

  onChangeClient(): void {
    this.clientsService.setSelectedClient(
      this.allClients,
      this.selectedClient.id
    );
  }
}
