import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private firestore: AngularFirestore) { }

  getRecordsByRange(start:Date,end:Date): any{
    return this.firestore.collection('records', ref => ref.where('startDate','>=',start).where('startDate','<',end)).snapshotChanges();
  }

  getCandiesByRange(start:Date,end:Date): any{
    return this.firestore.collection('candiesPurchases', ref => ref.where('date','>=',start).where('date','<',end)).snapshotChanges();
  }
  
  getWorksByRange(start:Date,end:Date): any{
    return this.firestore.collection('worksRecords', ref => ref.where('date','>=',start).where('date','<',end)).snapshotChanges();
  }

  getArticlesByRange(start:Date,end:Date): any{
    return this.firestore.collection('articlesPurchases', ref => ref.where('date','>=',start).where('date','<',end)).snapshotChanges();
  }

}

