import { Injectable } from '@angular/core';
import { Console } from './console.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClientsService } from '../../clients/clients.service';
import { Client } from '../../clients/client.model';
import { Subject } from 'rxjs';
import { Hour } from '../shared/hour.model';

@Injectable({
  providedIn: 'root'
})
export class ConsolesService {
  private consoleRecordEnd = new Subject<any>();
  consoleRecordEnd$ = this.consoleRecordEnd.asObservable();

  private consoleRecordAddTime = new Subject<any>();
  consoleRecordAddTime$ = this.consoleRecordAddTime.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private clientService: ClientsService
  ) { }

  //Console CRUD
  create(consoleModel: Console): any {
    return this.firestore.collection('consoles').add(consoleModel);
  }

  getConsoles(): any {
    return this.firestore.collection('consoles', ref => ref.where('available', '==', true).orderBy('name')).snapshotChanges();
  }

  update(console: Console) {
    let consoleId = console.id;
    this.firestore.doc(`consoles/${consoleId}`).update(console);
  }

  updateUnavailable(consoleId: string) {
    this.firestore.doc(`consoles/${consoleId}`).update({ available: false });
  }

  updateAvailable(consoleId: string) {
    this.firestore.doc(`consoles/${consoleId}`).update({ available: true });
  }

  delete(consoleModel: Console) {
    this.firestore.collection('consoles').doc(consoleModel.id).delete();
  }

  //Console Records CRUD
  createRecord(consoleId: string, clientModel: Client): any {
    this.updateUnavailable(consoleId);
    return this.clientService.update(clientModel);
  }

  //TODO DELETE
  getConsolesRecords(): any {
    return this.firestore.collection('records', ref => ref.where('finished', '==', false)).snapshotChanges();
  }

  //Console Modal
  confirmEndConsoleRecod(client: Client, consoleIndex: number) {
    let object = {
      client: client,
      consoleIndex: consoleIndex
    };
    this.consoleRecordEnd.next(object);
  }

  endConsoleRecord(client: Client, consoleIndex: number) {
    client.consolesRecords[consoleIndex].finished = true;
    if (client.consolesRecords[consoleIndex].notification) {
      client.consolesRecords[consoleIndex].notification.readed = true;
    }
    let consoleId = client.consolesRecords[consoleIndex].console.id;
    this.updateAvailable(consoleId);
    this.clientService.update(client);
  }

  confirmAddTimeConsoleRecord(client: Client, consoleIndex: number) {
    let object = {
      client: client,
      consoleIndex: consoleIndex
    };
    this.consoleRecordAddTime.next(object);
  }

  addTimeConsoleRecord(client: Client, consoleIndex: number, selectedHour: Hour) {
    let currentConsole = client.consolesRecords[consoleIndex];
    currentConsole.endDate =
      new Date(currentConsole.endDate.getTime() + selectedHour.hoursValue * 60 * 60 * 1000);
    currentConsole.hours += selectedHour.hoursValue;
    currentConsole.price = this.getConsoleRecordPrice(currentConsole.startDate, currentConsole.endDate,
      currentConsole.console.hourPrice, currentConsole.console.halfHourPrice);
    client.consolesRecords[consoleIndex] = currentConsole;
    if (client.consolesRecords[consoleIndex].notification) {
      delete client.consolesRecords[consoleIndex].notification;
    }
    this.clientService.update(client);
  }

  //Utility
  getConsoleRecordPrice(start: Date, end: Date, hourPrice: number, halfHourPrice: number): number {
    let difference: number = (end.getTime() - start.getTime()) / (60 * 60 * 1000);
    let hours: number = Math.floor(difference);
    let minutes: number = difference - hours;
    let total: number = 0;
    if (minutes != 0) {
      total += halfHourPrice;
    }
    if (hours >= 1) {
      total += hours * hourPrice;
    }
    return total;
  }

}
