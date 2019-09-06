import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/client.model';
import { ConsolesService } from '../consoles/shared/consoles.service';
import { Notification } from '../notifications/notification.model';
import { timer } from 'rxjs';
import { HOST_ATTR } from '@angular/compiler';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  minutesNotification: number = 3;
  notifications: any[] = [];
  clients;
  constructor(
    private clientsService: ClientsService,
    private consolesService: ConsolesService
  ) { }

  ngOnInit() {
    this.clientsService.activeClients$.subscribe(clients => {
      let now = new Date();
      this.notifications = []
      this.isConsoleRecordOnTime(clients, now);
      this.clients = clients;
    });

    const source = timer(1000, 60 * 1000);
    const subscribe = source.subscribe(() => {
      let now = new Date();
      if (this.clients) {
        this.isConsoleRecordOnTime(this.clients, now);
      }
    });
  }

  isConsoleRecordOnTime(clients: Client[], now: Date) {
    let minutesLess = new Date(now.getTime() + this.minutesNotification * 60 * 1000);
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
                } as Notification;
                this.clientsService.createNotification(client, consoleRecordIndex, notification);
                this.notifications.push(
                  {
                    client: client,
                    consoleRecordIndex: consoleRecordIndex,
                    notification: notification,
                  }
                );
              }
              if (!consoleRecord.notification.readed) {
                this.notifications.push(
                  {
                    client: client,
                    consoleRecordIndex: consoleRecordIndex,
                    notification: consoleRecord.notification
                  }
                );
              }
            }
          }
        });
      }
    });
  }

  closeNotification(notification: any) {
    this.clientsService.markAsReadedNotification(notification.client, notification.consoleRecordIndex);
  }

}
