import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //Observabble boolean sources
  private endRecordIdSource = new Subject<string>();
  private selectedHourSource = new Subject<any>();

  //Observable boolean streams
  endRecordId$ = this.endRecordIdSource.asObservable();
  selectedHour$ = this.selectedHourSource.asObservable();

  //Service
  confirmEndRecord(consoleRecordId: string) {
    this.endRecordIdSource.next(consoleRecordId);
  }

  confirmAddTime(object:any) {
    this.selectedHourSource.next(object);
  }

}
