import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WorkRecord } from './work-record.model';
import { Work } from './work.model';
import { Client } from '../clients/client.model';
import { ClientsService } from '../clients/clients.service';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(
    private firestore: AngularFirestore,
    private clientsService: ClientsService
  ) { }

  getWorks(): any {
    return this.firestore.collection('works', ref => ref.orderBy('name')).snapshotChanges();
  }

  create(workModel: Work): any {
    return this.firestore.collection('works').add(workModel);
  }

  update(workModel: Work) {
    this.firestore.doc('works/' + workModel.id).update(workModel);
  }

  delete(workModel: Work) {
    this.firestore.collection('works').doc(workModel.id).delete();
  }

  workRecord(workRecord: WorkRecord): any {
    return this.firestore.collection('worksRecords').add(workRecord);
  }

  endAllWorksRecords(client: Client) {
    let count = 0;
    client.worksRecords.forEach((workRecord, index) => {
      if (!client.worksRecords[index].paid) {
        count++;
        client.worksRecords[index].paid = true;
      }
    });
    if (count > 0) {
      this.clientsService.update(client);
    }
  }

}
