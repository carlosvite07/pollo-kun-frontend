import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/client.model';
import { ConsolesService } from '../consoles/shared/consoles.service';
import { ComputersService } from '../computers/computers.service';
import { Notification } from '../notifications/notification.model';
import { timer } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  minutesNotification: number = 2;
  notifications: any[] = [];
  clients;
  constructor(
    private clientsService: ClientsService,
    private consolesService: ConsolesService,
    private computersService: ComputersService
  ) {}

  ngOnInit() {
    this.clientsService.activeClients$.subscribe(clients => {
      let now = new Date();
      this.notifications = [];
      this.isClientRecordsOnTime(clients, now);
      this.clients = clients;
    });

    const source = timer(1000, 60 * 1000);
    source.subscribe(() => {
      let now = new Date();
      if (this.clients) {
        this.isClientRecordsOnTime(this.clients, now);
      }
    });
  }

  isClientRecordsOnTime(clients: Client[], now: Date) {
    let minutesLess = new Date(
      now.getTime() + this.minutesNotification * 60 * 1000
    );
    this.notifications = [];
    clients.forEach(client => {
      if (client.consolesRecords) {
        client.consolesRecords.forEach((consoleRecord, consoleRecordIndex) => {
          if (!consoleRecord.finished) {
            if (consoleRecord.endDate < now) {
              this.consolesService.endConsoleRecord(client, consoleRecordIndex);
            }
            if (consoleRecord.endDate < minutesLess) {
              if (!consoleRecord.notification) {
                let notification = {
                  body: `Faltan menos de ${this.minutesNotification} minutos para que termine la ${consoleRecord.console.name} del Cliente${client.counter}`,
                  readed: false,
                  isConsole: true
                } as Notification;
                this.clientsService.createNotification(
                  client,
                  consoleRecordIndex,
                  notification,
                  true
                );
                this.notifications.push({
                  client: client,
                  consoleRecordIndex: consoleRecordIndex,
                  notification: notification
                });
              }
              if (!consoleRecord.notification.readed) {
                this.notifications.push({
                  client: client,
                  consoleRecordIndex: consoleRecordIndex,
                  notification: consoleRecord.notification
                });
              }
            }
          }
        });
      }
      if (client.computersRecords) {
        client.computersRecords.forEach(
          (computerRecord, computerRecordIndex) => {
            if (!computerRecord.finished) {
              if (computerRecord.endDate < now) {
                this.computersService.endComputerRecord(
                  client,
                  computerRecordIndex
                );
              }
              if (computerRecord.endDate < minutesLess) {
                if (!computerRecord.notification) {
                  let notification = {
                    body: `Faltan menos de ${this.minutesNotification} minutos para que termine la ${computerRecord.computer.name} del Cliente${client.counter}`,
                    readed: false,
                    isConsole: false
                  } as Notification;
                  this.clientsService.createNotification(
                    client,
                    computerRecordIndex,
                    notification,
                    false
                  );
                  this.notifications.push({
                    client: client,
                    computerRecordIndex: computerRecordIndex,
                    notification: notification
                  });
                }
                if (!computerRecord.notification.readed) {
                  this.notifications.push({
                    client: client,
                    computerRecordIndex: computerRecordIndex,
                    notification: computerRecord.notification
                  });
                }
              }
            }
          }
        );
      }
    });
  }

  closeNotification(notification: any, isConsole: Boolean) {
    const index = isConsole
    ? notification.consoleRecordIndex
    : notification.computerRecordIndex;
    this.clientsService.markAsReadedNotification(
      notification.client,
      index,
      isConsole
    );
  }
}
