import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArticlePurchase } from './article-purchase.model';

@Injectable({
  providedIn: 'root'
})
export class StationeryService {

  constructor(private firestore: AngularFirestore) { }

  getArticles(): any{
    return this.firestore.collection('articles', ref => ref.where('stock','>',0)).snapshotChanges();
  }

  articlePurchase(articlePurchase: ArticlePurchase): any{
    return this.firestore.collection('articlesPurchases').add(articlePurchase);
  } 
  
}
