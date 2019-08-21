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

  getCandiesByRange(): any{
    return this.firestore.collection('candiesPurchases').snapshotChanges();
  }

  candiePurchase(candiePurchase: CandiePurchase): any{
    return this.firestore.collection('candiesPurchases').add(candiePurchase);
  }

  // dulces = [
  //   {
  //     name: 'Palomitas Blancas',
  //     price: 3,
  //     price2: 4,
  //     quantity: 30,
  //     quantity2: 35,
  //     stock: 1000
  //   },
  //   {
  //     name: 'Palomitas de Queso',
  //     price: 3,
  //     price2: 4,
  //     quantity: 30,
  //     quantity2: 35,
  //     stock: 1000
  //   },
  //   {
  //     name: 'Chetos de Lagrimita',
  //     price: 3,
  //     price2: 4,
  //     quantity: 30,
  //     quantity2: 35,
  //     stock: 1000
  //   },
  //   {
  //     name: 'Chetos de Queso',
  //     price: 3,
  //     price2: 4,
  //     quantity: 30,
  //     quantity2: 35,
  //     stock: 1000
  //   },
  //   {
  //     name: 'Chetos de Comillo',
  //     price: 3,
  //     price2: 4,
  //     quantity: 30,
  //     quantity2: 35,
  //     stock: 1000
  //   },
  //   {
  //     name: 'Doritos',
  //     price: 5,
  //     stock: 25
  //   },
  //   {
  //     name: 'Ruffles',
  //     price: 5,
  //     stock: 25
  //   },
  //   {
  //     name: 'Banderilla',
  //     price: 1,
  //     stock: 50
  //   },
  //   {
  //     name: 'Tamborin',
  //     price: 1,
  //     stock: 50
  //   },
  //   {
  //     name: 'Mazapan',
  //     price: 3.5,
  //     stock: 25
  //   },
  //   {
  //     name: 'Pelo PeloRico',
  //     price: 3.5,
  //     stock: 25
  //   },
  //   {
  //     name: 'Nucita',
  //     price: 3.5,
  //     stock: 25
  //   },
  //   {
  //     name: 'Pau Pau',
  //     price: 5,
  //     stock: 0
  //   },
  //   {
  //     name: 'Bubulubu',
  //     price: 3.5,
  //     stock: 25
  //   },
  // ];

  // createCandies(): any {
  //   this.dulces.forEach( value => this.firestore.collection('candies').add(value))  
  //   return true;
  // }


  
}
