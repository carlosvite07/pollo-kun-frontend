import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticlePurchase } from './article-purchase.model';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class StationeryService {

  constructor(private firestore: AngularFirestore) { }

  getArticles(): any{
    return this.firestore.collection('articles', ref => ref.where('stock','>',0)).snapshotChanges();
  }

  getAllArticles(): any{
    return this.firestore.collection('articles').snapshotChanges();
  }

  create(articleModel: Article): any {
    return this.firestore.collection('articles').add(articleModel);
  }

  update(articleModel: Article) {
    this.firestore.doc('articles/' + articleModel.id).update(articleModel);
  }

  delete(articleModel: Article) {
    this.firestore.collection('articles').doc(articleModel.id).delete();
  }

  articlePurchase(articlePurchase: ArticlePurchase): any{
    return this.firestore.collection('articlesPurchases').add(articlePurchase);
  } 
  
}
