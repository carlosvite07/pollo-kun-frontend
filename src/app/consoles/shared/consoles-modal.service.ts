import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  confirmEndRecord(consoleRecordId: string) {
    this.endRecordIdSource.next(consoleRecordId);
  }

  confirmAddTime(object:any) {
    this.selectedHourSource.next(object);
  }

  confirmCandiePurchase(object: CandiePurchase){
    this.candiePurchase.next(object);
  }

}
