import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private endHour = new Subject<string>();

  constructor() { }

  endRecord(){
    
  }
  

}
