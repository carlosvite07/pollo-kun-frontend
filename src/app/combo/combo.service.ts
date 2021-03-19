import { Injectable } from '@angular/core';
import { Client } from '../clients/client.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  private comboShowModal = new Subject<any>();
  comboShowModal$ = this.comboShowModal.asObservable();

  constructor() {}

  confirmAddTimeComputerRecord(client: Client) {
    const object = {
      client: client
    };
    this.comboShowModal.next(object);
  }
}
