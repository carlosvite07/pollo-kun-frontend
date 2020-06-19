import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticlePurchase } from './article-purchase.model';
import { Article } from './article.model';
import { Client } from '../clients/client.model';
import { ClientsService } from '../clients/clients.service';
import { History } from '../history.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(
    private firestore: AngularFirestore,
    private clientsService: ClientsService
  ) {}

  getAllArticles(): any {
    return this.firestore
      .collection('articles', ref => ref.orderBy('name'))
      .snapshotChanges();
  }

  create(articleModel: Article): any {
    return this.firestore.collection('articles').add(articleModel);
  }

  update(articleModel: Article) {
    this.firestore.doc('articles/' + articleModel.id).update(articleModel);
  }

  //Deprecated
  updateStock(articleId: string, stock: number) {
    this.firestore.doc('articles/' + articleId).update({ stock: stock });
  }

  updateHistory(articleId: string, history: Array<History>) {
    this.firestore.doc('articles/' + articleId).update({ history: history });
  }

  delete(articleModel: Article) {
    this.firestore.collection('articles').doc(articleModel.id).delete();
  }

  articlePurchase(articlePurchase: ArticlePurchase): any {
    return this.firestore.collection('articlesPurchases').add(articlePurchase);
  }

  endAllArticlesPurchases(client: Client) {
    let count = 0;
    client.articlesPurchases.forEach((purchase, index) => {
      if (!client.articlesPurchases[index].paid) {
        count++;
        client.articlesPurchases[index].paid = true;
      }
    });
    if (count > 0) {
      this.clientsService.update(client);
    }
  }
}
