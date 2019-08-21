import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WorkRecord } from './work-record.model';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private firestore: AngularFirestore) { }

  getWorks(): any{
    return this.firestore.collection('works', ref => ref.orderBy('name')).snapshotChanges();
  }

  workRecord(workRecord: WorkRecord): any{
    return this.firestore.collection('workRecord').add(workRecord);
  }
    
  works = [
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
  ];

  createWorks(): any {
    this.works.forEach( value => this.firestore.collection('works').add(value))  
    return true;
  }

}
