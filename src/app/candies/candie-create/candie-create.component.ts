import { Component, OnInit, Input } from '@angular/core';
import { Candie } from '../candie.model';
import { CandiesService } from '../candies.service';
import { CandiePurchase } from '../candie-purchase.model';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-candie-create',
  templateUrl: './candie-create.component.html',
  styleUrls: ['./candie-create.component.scss']
})
export class CandieCreateComponent implements OnInit {
  @Input() client;
  allCandies: Candie[] = [];
  selectedCandie: Candie;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorCandie: boolean = false;
  errorQuantity: boolean = false;
  successPurchase = false;

  constructor(
    private candiesService: CandiesService,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.candiesService.getCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Candie;
      });
    });
  }

  onChangeSelection(): void {
    this.selectedPrice = this.selectedCandie.price;
    this.errorCandie = false;
  }

  onChangeQuantity(): void {
    this.errorQuantity = this.selectedQuantity <= 0 || this.selectedCandie.stock < this.selectedQuantity;
  }

  candiePurchaseConfirm(): void {
    this.errorCandie = (this.selectedCandie) ? false : true;
    this.errorQuantity = this.selectedQuantity <= 0 || this.selectedCandie.stock < this.selectedQuantity;
    if (this.errorCandie || this.errorQuantity) {
      return;
    }
    let newPurchase = {
      date: new Date(),
      candie: this.selectedCandie,
      quantity: this.selectedQuantity,
      price: this.selectedQuantity * this.selectedPrice,
      paid: false
    } as CandiePurchase;
    if (!this.client.candiesPurchases) {
      this.client.candiesPurchases = [];
    }
    this.client.candiesPurchases.unshift(newPurchase);
    this.clientsService.update(this.client);
    this.candiesService.updateStock(this.selectedCandie.id,this.selectedCandie.stock-this.selectedQuantity);
    this.selectedCandie = undefined;
    this.selectedQuantity = 1;
  }

}
