import { Injectable } from '@angular/core';
import { Console } from './console.model';
import { ConsoleRecord } from './console-record.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConsolesService {

  constructor(private firestore: AngularFirestore) { }

  //Console CRUD
  create(consoleModel: Console): any {
    return this.firestore.collection('consoles').add(consoleModel);
  }

  getConsoles(): any {
    return this.firestore.collection('consoles', ref => ref.where('available', '==', true).orderBy('name')).snapshotChanges();
  }

  update(consoleModel: Console) {
    this.firestore.doc('consoles/' + consoleModel.id).update(consoleModel);
  }

  delete(consoleModel: Console) {
    this.firestore.collection('consoles').doc(consoleModel.id).delete();
  }

  //Console Records CRUD
  createRecord(consoleRecord: ConsoleRecord, consoleModel: Console): any {
    consoleModel.available = false;
    this.update(consoleModel);
    return this.firestore.collection('records').add(consoleRecord);
  }

  getConsolesRecords(): any {
    return this.firestore.collection('records', ref => ref.where('finished', '==', false)).snapshotChanges();
  }

  addTime(record: ConsoleRecord) {
    record.price = this.getConsoleRecordPrice(record.startDate, record.endDate, record.console.hourPrice, record.console.halfHourPrice);
    this.firestore.doc('records/' + record.id).update(record);
  }

  endConsoleRecord(record: ConsoleRecord) {
    record.console.available = true;
    this.update(record.console);
    record.finished = true;
    this.firestore.doc('records/' + record.id).update(record);
  }

   //Utility
   getConsoleRecordPrice(start: Date, end: Date, hourPrice: number, halfHourPrice: number, ): number {
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
