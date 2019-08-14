import { Injectable } from '@angular/core';
import { Console } from './console.model';
import { Record } from './record.model';
import { CONSOLES } from './mock-console';
import { Observable, of, Subject, EMPTY } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private firestore: AngularFirestore) { }

  getConsoles(): any {
    return this.firestore.collection('consoles', ref => ref.where('available', '==', true).orderBy('name')).snapshotChanges();
  }

  updateConsole(consoleModel: Console) {
    this.firestore.doc('consoles/' + consoleModel.id).update(consoleModel);
  }

  getRecords(): any {
    let now = new Date();
    return this.firestore.collection('records', ref => ref.where('finished', '==', false)).snapshotChanges();
  }

  createRecord(record: Record, consoleModel: Console): any {
    this.updateConsole(consoleModel);
    return this.firestore.collection('records').add(record);
  }

  endRecord(record: Record) {
    record.console.available = true;
    this.updateConsole(record.console);
    record.finished = true;
    this.firestore.doc('records/' + record.id).update(record);
  }

}
