import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Emergency } from './emergency.model';

@Injectable({
  providedIn: 'root'
})
export class EmergenciesService {
  constructor(private firestore: AngularFirestore) {}

  create(emergencyModel: Emergency): any {
    return this.firestore.collection('emergencies').add(emergencyModel);
  }
}
