import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private firestore: AngularFirestore) { }

  getClientsByRange(start:Date,end:Date){
    return this.firestore.collection('clients', ref => ref.where('startDate','>=',start).where('startDate','<',end)).snapshotChanges();
  }
  
}

