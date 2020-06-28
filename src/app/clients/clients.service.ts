import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Notification } from '../notifications/notification.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private activeClients = new Subject<any>();
  activeClients$ = this.activeClients.asObservable();

  private clientEnd = new Subject<any>();
  clientEnd$ = this.clientEnd.asObservable();

  constructor(private firestore: AngularFirestore) {}

  getOldClients(startDate: Date) {
    return this.firestore
      .collection('clients', ref =>
        ref.where('finished', '==', false).where('startDate', '<', startDate)
      )
      .snapshotChanges();
  }

  finishClient(client: Client) {
    if (client.consolesRecords) {
      client.consolesRecords.forEach((consoleRecord, consoleIndex) => {
        if (!consoleRecord.finished) {
          this.endConsoleRecord(client, consoleIndex);
        }
      });
    }
    client.finished = true;
    this.update(client);
  }

  setActiveClients(clients: Client[]) {
    this.activeClients.next(clients);
  }

  //Clients CRUD
  create(clientModel: Client): any {
    return this.firestore.collection('clients').add(clientModel);
  }

  getClients(startDate: Date): any {
    return this.firestore
      .collection('clients', ref =>
        ref.where('startDate', '>=', startDate).orderBy('startDate', 'desc')
      )
      .snapshotChanges();
  }

  update(clientModel: Client) {
    this.firestore.doc('clients/' + clientModel.id).update(clientModel);
  }

  set(clientModel: Client) {
    this.firestore.doc('clients/' + clientModel.id).set(clientModel);
  }

  endConsoleRecord(client: Client, consoleRecordIndex: number) {
    client.consolesRecords[consoleRecordIndex].finished = true;
    let consoleId = client.consolesRecords[consoleRecordIndex].console.id;
    this.updateConsoleAvailable(consoleId);
    this.update(client);
  }

  updateConsoleAvailable(consoleId: string) {
    this.firestore.doc(`consoles/${consoleId}`).update({ available: true });
  }

  createNotification(
    client: Client,
    consoleOrComputerRecordIndex: number,
    notification: Notification,
    isConsole: Boolean
  ) {
    if (isConsole) {
      client.consolesRecords[
        consoleOrComputerRecordIndex
      ].notification = notification;
    } else {
      client.computersRecords[
        consoleOrComputerRecordIndex
      ].notification = notification;
    }
    this.update(client);
  }

  markAsReadedNotification(
    client: Client,
    consoleOrComputerRecordIndex: number,
    isConsole: Boolean
  ) {
    if (isConsole) {
      client.consolesRecords[
        consoleOrComputerRecordIndex
      ].notification.readed = true;
    } else {
      client.computersRecords[
        consoleOrComputerRecordIndex
      ].notification.readed = true;
    }
    this.update(client);
  }

  endClient(client: Client): any {
    client.finished = true;
    client.selected = false;
    this.update(client);
  }

  //Modal
  confirmEndClient(client: Client, debt: number) {
    let object = {
      client: client,
      debt: debt
    };
    this.clientEnd.next(object);
  }

  setSelectedClient(clients: Client[], idSelectedClient: string) {
    clients.forEach(client => {
      if (client.id === idSelectedClient) {
        client.selected = true;
      } else {
        client.selected = false;
      }
      this.update(client);
    });
  }
}
