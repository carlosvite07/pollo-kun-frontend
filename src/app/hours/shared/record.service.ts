import { Injectable } from '@angular/core';
import { Console } from './console.model';
import { Record } from './record.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private firestore: AngularFirestore) { }

  getConsoles(): any {
    return this.firestore.collection('consoles', ref => ref.where('available', '==', true).orderBy('name')).snapshotChanges();
  }

  create(consoleModel: Console): any{
    return this.firestore.collection('consoles').add(consoleModel);
  }

  update(consoleModel: Console) {
    this.firestore.doc('consoles/' + consoleModel.id).update(consoleModel);
  }

  delete(consoleModel: Console) {
    this.firestore.collection('consoles').doc(consoleModel.id).delete();
  }

  getRecords(): any {
    return this.firestore.collection('records', ref => ref.where('finished', '==', false)).snapshotChanges();
  }

  createRecord(record: Record, consoleModel: Console): any {
    this.update(consoleModel);
    return this.firestore.collection('records').add(record);
  }

  getRecordPrice(start: Date, end: Date, hourPrice: number, halfHourPrice: number, ): number {
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

  endRecord(record: Record) {
    record.console.available = true;
    this.update(record.console);
    record.finished = true;
    this.firestore.doc('records/' + record.id).update(record);
  }

  addTime(record: Record) {
    record.price = this.getRecordPrice(record.startDate,record.endDate,record.console.hourPrice,record.console.halfHourPrice);
    this.firestore.doc('records/' + record.id).update(record);
  }

  timeVerify(){
    console.log("less than a minute");
  }

}
