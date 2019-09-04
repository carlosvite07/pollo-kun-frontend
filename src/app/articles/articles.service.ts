import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticlePurchase } from '../articles/article-purchase.model';
import { Article } from '../articles/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private firestore: AngularFirestore) { }

  getArticles(): any {
    return this.firestore.collection('articles', ref => ref.where('stock', '>', 0)).snapshotChanges();
  }

  getAllArticles(): any {
    return this.firestore.collection('articles').snapshotChanges();
  }

  create(articleModel: Article): any {
    return this.firestore.collection('articles').add(articleModel);
  }

  update(articleModel: Article) {
    this.firestore.doc('articles/' + articleModel.id).update(articleModel);
  }

  updateStock(articleId: string, stock: number) {
    this.firestore.doc('articles/' + articleId).update({ stock: stock });
  }

  delete(articleModel: Article) {
    this.firestore.collection('articles').doc(articleModel.id).delete();
  }

  articlePurchase(articlePurchase: ArticlePurchase): any {
    return this.firestore.collection('articlesPurchases').add(articlePurchase);
  }

}
