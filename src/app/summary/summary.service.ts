import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private firestore: AngularFirestore) { }

  // getCandiesByRange(start: Date, end: Date): any {
  //   return this.firestore.collection('candies', ref => ref.where('stock', '>', 0)).snapshotChanges();
  // }

  getCandiesByRange(start:Date,end:Date): any{
    return this.firestore.collection('candiesPurchases', ref => ref.where('date','>=',start).where('date','<',end)).snapshotChanges();
  }
}

