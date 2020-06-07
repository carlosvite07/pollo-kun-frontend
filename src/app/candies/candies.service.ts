import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CandiePurchase } from './candie-purchase.model';
import { Candie } from './candie.model';
import { Client } from '../clients/client.model';
import { ClientsService } from '../clients/clients.service';
import { History } from '../history.model'

@Injectable({
  providedIn: 'root'
})
export class CandiesService {

  constructor(
    private firestore: AngularFirestore,
    private clientsService: ClientsService
  ) { }

  getAllCandies() {
    return this.firestore.collection('candies', ref => ref.orderBy('name')).snapshotChanges();
  }

  create(candieModel: Candie): any {
    console.log(candieModel);
    return this.firestore.collection('candies').add(candieModel);
  }

  update(candieModel: Candie) {
    this.firestore.doc('candies/' + candieModel.id).update(candieModel);
  }

  updateStock(articleId: string, stock: number) {
    this.firestore.doc('candies/' + articleId).update({ stock: stock });
  }

  updateHistory(articleId: string, history: Array<History>) {
    this.firestore.doc('candies/' + articleId).update({ history: history });
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
