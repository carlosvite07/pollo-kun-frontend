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

  private clientEnd = new Subject<Client>();
  clientEnd$ = this.clientEnd.asObservable();

  constructor(private firestore: AngularFirestore) { }

  getOldClients(startDate: Date) {
    return this.firestore.collection('clients',
      ref => ref.where('finished', '==', false).where('startDate', '<', startDate)).snapshotChanges();
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
    return this.firestore.collection('clients',
      ref => ref.where('startDate', '>=', startDate).orderBy('startDate', "desc")).snapshotChanges();
  }

  update(clientModel: Client) {
    this.firestore.doc('clients/' + clientModel.id).update(clientModel);
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

  createNotification(client: Client, consoleRecordIndex: number, notification: Notification) {
    client.consolesRecords[consoleRecordIndex].notification = notification;
    this.update(client);
  }

  markAsReadedNotification(client: Client, consoleRecordIndex: number) {
    client.consolesRecords[consoleRecordIndex].notification.readed = true;
    this.update(client);
  }

  endClient(client: Client): any {
    client.finished = true;
    this.update(client);
  }

  //Modal
  confirmEndClient(client: Client) {
    this.clientEnd.next(client);
  }

}
