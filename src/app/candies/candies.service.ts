import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CandiePurchase } from './candie-purchase.model';
import { Candie } from './candie.model';

@Injectable({
  providedIn: 'root'
})
export class CandiesService {

  constructor(private firestore: AngularFirestore) { }

  getCandies(): any {
    return this.firestore.collection('candies', ref => ref.where('stock', '>', 0)).snapshotChanges();
  }

  getAllCandies() {
    return this.firestore.collection('candies').snapshotChanges();
  }

  create(candieModel: Candie): any {
    return this.firestore.collection('candies').add(candieModel);
  }

  update(candieModel: Candie) {
    this.firestore.doc('candies/' + candieModel.id).update(candieModel);
  }

  delete(candieModel: Candie) {
    this.firestore.collection('candies').doc(candieModel.id).delete();
  }

  candiePurchase(candiePurchase: CandiePurchase): any {
    return this.firestore.collection('candiesPurchases').add(candiePurchase);
  }

}
