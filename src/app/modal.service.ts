import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hour } from './hour';

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
  confirmEndRecord(recordId: string) {
    this.endRecordIdSource.next(recordId);
  }

  confirmAddTime(object:any) {
    this.selectedHourSource.next(object);
  }

}
