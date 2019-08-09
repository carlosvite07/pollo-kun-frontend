import { Injectable } from '@angular/core';
import { Console } from './console';
import { CONSOLES } from './mock-console';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  
  private availiableConsoles = new Subject<Console[]>();
  availiableConsoles$ = this.availiableConsoles.asObservable();

  constructor() { }

  getConsoles(): Observable<Console[]> {
    return of(CONSOLES.sort((a, b) => a.id - b.id));
  }

  /* TODO Send the register with flag ended = false and make busy on the backend */
  busyConsole(id: number): Observable<Console[]> {
    let index = CONSOLES.findIndex(object => object.id === id);
    CONSOLES[index].available = false;
    return of(CONSOLES.sort((a, b) => a.id - b.id));
  }

  /* TODO Send the register with flag ended = true and free the console*/
  endRecord(id: number):void {
    let index = CONSOLES.findIndex(object => object.id === id);
    CONSOLES[index].available = true;
  }

}
