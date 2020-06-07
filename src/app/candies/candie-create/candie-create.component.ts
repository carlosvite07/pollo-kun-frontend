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
  stock: number = 0;
  successPurchase = false;

  constructor(
    private candiesService: CandiesService,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.candiesService.getAllCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        const candieResp = e.payload.doc.data() as Candie;
        return {
          id: e.payload.doc.id,
          name: candieResp.name,
          price: candieResp.price,
          history: candieResp.history
        } as Candie;
      });
    });
  }

  onChangeSelection(): void {
    this.stock = 0;
    this.selectedPrice = this.selectedCandie.price;
    this.errorCandie = false;
    this.selectedCandie.history.forEach(element => this.stock += element.stock);
    this.errorQuantity = this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
  }

  onChangeQuantity(): void {
    this.errorQuantity = this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
  }

  candiePurchaseConfirm(): void {
    this.errorCandie = (this.selectedCandie) ? false : true;
    this.errorQuantity = this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
    if (this.errorCandie || this.errorQuantity) {
      return;
    }

    let quantityBuyed = this.selectedQuantity;
    let history = this.selectedCandie.history;

    if (!this.client.candiesPurchases) {
      this.client.candiesPurchases = [];
    }

    this.selectedCandie.history.forEach((element,index) => {
      if(element.stock < quantityBuyed){
        if(element.stock !== 0 && quantityBuyed !== 0){
          quantityBuyed -= element.stock;
          this.createPurchase(this.selectedPrice, element.unitary, element.stock, this.selectedCandie)
          history[index].stock = 0;
          this.candiesService.updateHistory(this.selectedCandie.id, history);
        }
      }else{
        if(quantityBuyed !== 0){
          this.createPurchase(this.selectedPrice, element.unitary, quantityBuyed, this.selectedCandie)
          history[index].stock -= quantityBuyed;
          quantityBuyed = 0; 
          this.candiesService.updateHistory(this.selectedCandie.id,history);
        }
      }
    });
    
    this.selectedCandie = undefined;
    this.selectedQuantity = 1;
  }

  createPurchase(candiePrice: number, unitary: number, quantityBuyed:number, candie:Candie): void {
    const profit = (candiePrice - unitary) * quantityBuyed;
    const newPurchase = {
      date: new Date(),
      candie: candie,
      quantity: quantityBuyed,
      price: quantityBuyed * candiePrice,
      paid: false,
      profit: parseFloat(profit.toFixed(2)),
      unitary: unitary
    } as CandiePurchase;
    this.client.candiesPurchases.unshift(newPurchase);
    this.clientsService.update(this.client);
  }

}
