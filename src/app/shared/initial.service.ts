import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor(private firestore: AngularFirestore) { }

  consoles = [
    { name: '1 XBOX 360', available: true, hourPrice: 10, type:'360', halfHourPrice: 7 },
    { name: '2 XBOX ONE', available: true, hourPrice: 15, type:'one', halfHourPrice: 10 },
    { name: '3 XBOX 360', available: true, hourPrice: 10, type:'360', halfHourPrice: 7 },
    { name: '4 XBOX ONE', available: true, hourPrice: 15, type:'one', halfHourPrice: 10 },
    { name: '5 XBOX ONE', available: true, hourPrice: 15, type:'one', halfHourPrice: 10 },
  ];

  candies = [
    {
      name: 'Palomitas Blancas',
      price: 3,
      price2: 4,
      quantity: 30,
      quantity2: 35,
      stock: 1000
    },
    {
      name: 'Palomitas de Queso',
      price: 3,
      price2: 4,
      quantity: 30,
      quantity2: 35,
      stock: 1000
    },
    {
      name: 'Chetos de Lagrimita',
      price: 3,
      price2: 4,
      quantity: 30,
      quantity2: 35,
      stock: 1000
    },
    {
      name: 'Chetos de Queso',
      price: 3,
      price2: 4,
      quantity: 30,
      quantity2: 35,
      stock: 1000
    },
    {
      name: 'Chetos de Comillo',
      price: 3,
      price2: 4,
      quantity: 30,
      quantity2: 35,
      stock: 1000
    },
    {
      name: 'Doritos',
      price: 5,
      stock: 25
    },
    {
      name: 'Ruffles',
      price: 5,
      stock: 25
    },
    {
      name: 'Banderilla',
      price: 1,
      stock: 50
    },
    {
      name: 'Tamborin',
      price: 1,
      stock: 50
    },
    {
      name: 'Mazapan',
      price: 3.5,
      stock: 25
    },
    {
      name: 'Pelo PeloRico',
      price: 3.5,
      stock: 25
    },
    {
      name: 'Nucita',
      price: 3.5,
      stock: 25
    },
    {
      name: 'Pau Pau',
      price: 5,
      stock: 0
    },
    {
      name: 'Bubulubu',
      price: 3.5,
      stock: 25
    },
    {
      name: 'Pulparindos',
      price: 2.5,
      stock: 25
    },
    {
      name: 'Cacahuates',
      price: 4,
      stock: 0
    },
  ];

  works = [
    {
      name: 'Copias',
      price: 1,
    },
    {
      name: 'Impresión B/N',
      price: 1,
    },
    {
      name: 'Impresión Poco Color',
      price: 3,
    },
    {
      name: 'Impresión Medio Color',
      price: 5,
    },
    {
      name: 'Impresión Mucho Color',
      price: 10,
    },
    {
      name: 'CURP B/N',
      price: 5,
    },
    {
      name: 'CURP A Color',
      price: 8,
    },
    {
      name: 'Reemplacamiento',
      price: 50,
    },
    {
      name: 'Llenar Hoja Formato',
      price: 5,
    },
    {
      name: 'Crear cuenta de Correo/FB/Twitter',
      price: 3,
    },
    {
      name: 'Carta de Recomendación',
      price: 5,
    },
    {
      name: 'Palomitas Blancas',
      price: 3,
    },
    {
      name: 'Otro',
      price: 0
    }
  ];

  articles = [
    {
      name: 'Folder Carta',
      price: 3,
      stock: 10
    },
    {
      name: 'Folder Officio',
      price: 4.5,
      stock: 10
    },
    {
      name: 'Pluma Negra',
      price: 3.5,
      stock: 10
    },
    {
      name: 'Pluma Roja',
      price: 3.5,
      stock: 10
    },
    {
      name: 'Pluma Azul',
      price: 3.5,
      stock: 10
    },
    {
      name: 'Goma Chica',
      price: 3,
      stock: 10
    },
    {
      name: 'Goma Mediana',
      price: 3.5,
      stock: 10
    },
    {
      name: 'Goma Grande',
      price: 4,
      stock: 10
    },
    {
      name: 'Disco',
      price: 8,
      stock: 49
    },
    {
      name: 'Adaptador Micro SD ',
      price: 5,
      stock: 10
    },
    {
      name: 'Micro SD 16 GB',
      price: 100,
      stock: 3
    },
    {
      name: 'Micro SD 32 GB',
      price: 130,
      stock: 2
    },
    {
      name: 'USB 16 GB',
      price: 100,
      stock: 3
    },
    {
      name: 'USB 32 GB',
      price: 130,
      stock: 3
    },
    {
      name: 'USB 32 GB',
      price: 130,
      stock: 3
    },
    {
      name: 'Prit',
      price: 4,
      stock: 3
    }
  ];

  createAll(): any {
    // this.articles.forEach( value => this.firestore.collection('articles').add(value));  
    // this.candies.forEach( value => this.firestore.collection('candies').add(value)); 
    // this.works.forEach( value => this.firestore.collection('works').add(value));
    // this.consoles.forEach( value => this.firestore.collection('consoles').add(value));  
    return true;
  }
  
}
