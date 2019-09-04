import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-candie-show',
  templateUrl: './candie-show.component.html',
  styleUrls: ['./candie-show.component.scss']
})
export class CandieShowComponent{
  @Input() client;
  constructor() { }

}
