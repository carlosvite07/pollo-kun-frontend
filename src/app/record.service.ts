import { Injectable } from '@angular/core';
import { Console } from './console';
import { Record } from './record';
import { CONSOLES } from './mock-console';
import { Observable, of, Subject, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private records : Array<Record> = []
  // availiableConsoles$ = this.availiableConsoles.asObservable();

  constructor() { }

  /* Implement when the endpoint is finished */
  getConsoles(): Observable<Console[]> {
    return of(CONSOLES.sort((a, b) => a.id - b.id));
  }

  getRecords(): Observable<Record[]>{
    return of(this.records);
  }

  /* TODO Send the record with flag ended = false and make busy on the backend */
  makeARecord(id: number, record : Record): Observable<Console[]> {
    let index = CONSOLES.findIndex(object => object.id === id);
    CONSOLES[index].available = false;
    return this.getConsoles();
  }

  /* TODO Send the record with flag ended = true and free the console*/
  endRecord(id: number):  Observable<Console[]> {
    let index = CONSOLES.findIndex(object => object.id === id);
    CONSOLES[index].available = true;
    return of(CONSOLES.sort((a, b) => a.id - b.id));
  }


  private subject = new Subject<any>();

  sendMessage(message: string) {
    console.log('send');
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
