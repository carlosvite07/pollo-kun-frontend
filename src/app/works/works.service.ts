import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WorkRecord } from './work-record.model';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private firestore: AngularFirestore) { }

  getWorks(): any{
    return this.firestore.collection('works', ref => ref.orderBy('name')).snapshotChanges();
  }

  workRecord(workRecord: WorkRecord): any{
    return this.firestore.collection('worksRecords').add(workRecord);
  }
    
}
