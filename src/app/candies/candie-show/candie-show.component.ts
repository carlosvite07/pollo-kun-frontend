import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candie-show',
  templateUrl: './candie-show.component.html',
  styleUrls: ['./candie-show.component.scss']
})
export class CandieShowComponent implements OnInit {
  @Input() client;
  constructor() { }

  ngOnInit() {
    // this.client.candiesPurchases.map(candiePurchase => {
    //   candiePurchase.date = candiePurchase.date.toDate();
    // });
  }

}
