import { Component, OnInit } from '@angular/core';
import { CandiesService } from './candies.service';
import { Candie } from './candie.model';
import { CandiePurchase } from './candie-purchase.model';

@Component({
  selector: 'app-candies',
  templateUrl: './candies.component.html',
  styleUrls: ['./candies.component.scss']
})
export class CandiesComponent implements OnInit {
  allCandies: Candie[] = [];
  selectedCandie: Candie;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorCandie: boolean = false;
  errorQuantity: boolean = false;
  successPurchase = false;

  constructor(private candiesService: CandiesService) { }

  ngOnInit() {
    this.candiesService.getCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Console;
      });
    });
  }

  onChangeSelection(): void {
    this.selectedPrice = this.selectedCandie.price;
    this.errorCandie = false;
  }

  onChangeQuantity(): void {
    this.errorQuantity = (this.selectedQuantity <= 0) ? true : false;
  }

  candiePurchaseConfirm(): void {
    this.errorCandie = (this.selectedCandie) ? false : true;
    this.errorQuantity = (this.selectedQuantity <= 0) ? true : false;
    if (this.errorCandie || this.errorQuantity) {
      return;
    }
    let newPurchase = {
      date: new Date(),
      name: this.selectedCandie.name,
      quantity: this.selectedQuantity,
      price: this.selectedQuantity * this.selectedPrice
    } as CandiePurchase;
    this.candiesService.candiePurchase(newPurchase);
    this.selectedCandie = undefined;
    this.selectedQuantity = 1;
    this.showSuccesPurchase();
  }

  showSuccesPurchase() {
    this.successPurchase = true;
    setTimeout(() => {
      this.successPurchase = false;
    }, 3000)
  }

}
