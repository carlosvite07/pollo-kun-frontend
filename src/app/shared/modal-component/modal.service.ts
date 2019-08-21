import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hour } from '../../hours/shared/hour.model';
import { CandiePurchase } from 'src/app/candies/candie-purchase.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //Observabble boolean sources
  private endRecordIdSource = new Subject<string>();
  private selectedHourSource = new Subject<any>();
  private candiePurchase = new Subject<CandiePurchase>();

  //Observable boolean streams
  endRecordId$ = this.endRecordIdSource.asObservable();
  selectedHour$ = this.selectedHourSource.asObservable();
  candiePurchase$ = this.candiePurchase.asObservable();

  //Service
  confirmEndRecord(recordId: string) {
    this.endRecordIdSource.next(recordId);
  }

  confirmAddTime(object:any) {
    this.selectedHourSource.next(object);
  }

  confirmCandiePurchase(object: CandiePurchase){
    this.candiePurchase.next(object);
  }

}
