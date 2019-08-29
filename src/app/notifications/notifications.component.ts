import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/client.model';
import { ConsolesService } from '../consoles/shared/consoles.service';
import { Notification } from '../notifications/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  minutesNotification: number = 5;
  notifications: Notification[] = [];
  constructor(
    private clientsService: ClientsService,
    private consolesService: ConsolesService
  ) { }

  ngOnInit() {
    this.clientsService.activeClients$.subscribe(clients => {
      let now = new Date();
      this.notifications = []
      this.isConsoleRecordOnTime(clients, now);
      setInterval(() => {
        let now = new Date();
        this.isConsoleRecordOnTime(clients, now);
      }, 60 * 1000);
    });



  }

  isConsoleRecordOnTime(clients: Client[], now: Date) {
    let minutesLess = new Date(now.getTime() + this.minutesNotification * 60 * 1000);
    clients.forEach(client => {
      if (client.consolesRecords) {
        client.consolesRecords.forEach((consoleRecord, consoleRecordIndex) => {
          if (!consoleRecord.finished) {
            if (consoleRecord.endDate < now) {
              this.consolesService.endConsoleRecord(client, consoleRecordIndex);
            }
            if (consoleRecord.endDate < minutesLess) {              
              if(!consoleRecord.notification){
                let notification = {
                  body: `Faltan menos de ${this.minutesNotification} minutos para que termine la ${consoleRecord.console.name} del Cliente${client.counter}`,
                  readed: false,
                } as Notification;
                this.clientsService.createNotification(client, consoleRecordIndex, notification);
                this.notifications.push(notification);
              }
              this.notifications.push(consoleRecord.notification);
            }
          }
        });
      }
    });
  }

  makeReadedNotification(notification: Notification){
    notification
  }


}
