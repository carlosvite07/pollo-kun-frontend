import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CandiePurchase } from './candie-purchase.model';
import { Candie } from './candie.model';
import { Client } from '../clients/client.model';
import { ClientsService } from '../clients/clients.service';

@Injectable({
  providedIn: 'root'
})
export class CandiesService {

  constructor(
    private firestore: AngularFirestore,
    private clientsService: ClientsService
  ) { }

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

  updateStock(articleId: string, stock: number) {
    this.firestore.doc('candies/' + articleId).update({ stock: stock });
  }

  delete(candieModel: Candie) {
    this.firestore.collection('candies').doc(candieModel.id).delete();
  }

  candiePurchase(candiePurchase: CandiePurchase): any {
    return this.firestore.collection('candiesPurchases').add(candiePurchase);
  }

  endAllCandiesPurchases(client: Client) {
    let count = 0;
    client.candiesPurchases.forEach((purchase, index) => {
      if (!client.candiesPurchases[index].paid) {
        count++;
        client.candiesPurchases[index].paid = true;
      }
    });
    if (count > 0) {
      this.clientsService.update(client);
    }
  }

}
