import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CandiePurchase } from './candie-purchase.model';

@Injectable({
  providedIn: 'root'
})
export class CandiesService {

  constructor(private firestore: AngularFirestore) { }

  getCandies(): any{
    return this.firestore.collection('candies', ref => ref.where('stock','>',0)).snapshotChanges();
  }

  candiePurchase(candiePurchase: CandiePurchase): any{
    return this.firestore.collection('candiesPurchases').add(candiePurchase);
  }
  
}
