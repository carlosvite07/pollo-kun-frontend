import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ElectronicPurchase } from './electronic-purchase.model';
import { Electronic } from './electronic.model';
import { Client } from '../clients/client.model';
import { ClientsService } from '../clients/clients.service';
import { History } from '../history.model';

@Injectable({
  providedIn: 'root'
})
export class ElectronicsService {
  constructor(
    private firestore: AngularFirestore,
    private clientsService: ClientsService
  ) {}

  getAllElectronics(): any {
    return this.firestore
      .collection('electronics', ref => ref.orderBy('name'))
      .snapshotChanges();
  }

  create(electronicModel: Electronic): any {
    return this.firestore.collection('electronics').add(electronicModel);
  }

  update(electronicModel: Electronic) {
    this.firestore
      .doc('electronics/' + electronicModel.id)
      .update(electronicModel);
  }

  //Deprecated
  updateStock(electronicId: string, stock: number) {
    this.firestore.doc('electronics/' + electronicId).update({ stock: stock });
  }

  updateHistory(electronicId: string, history: Array<History>) {
    this.firestore
      .doc('electronics/' + electronicId)
      .update({ history: history });
  }

  delete(electronicModel: Electronic) {
    this.firestore.collection('electronics').doc(electronicModel.id).delete();
  }

  electronicPurchase(electronicPurchase: ElectronicPurchase): any {
    return this.firestore
      .collection('electronicsPurchases')
      .add(electronicPurchase);
  }

  endAllElectronicsPurchases(client: Client) {
    let count = 0;
    client.electronicsPurchases.forEach((purchase, index) => {
      if (!client.electronicsPurchases[index].paid) {
        count++;
        client.electronicsPurchases[index].paid = true;
      }
    });
    if (count > 0) {
      this.clientsService.update(client);
    }
  }
}
