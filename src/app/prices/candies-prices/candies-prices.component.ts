import { Component, OnInit } from '@angular/core';
import { CandiesService } from '../../candies/candies.service';
import { Candie } from '../../candies/candie.model'

@Component({
  selector: 'app-candies-prices',
  templateUrl: './candies-prices.component.html',
  styleUrls: ['./candies-prices.component.scss']
})
export class CandiesPricesComponent implements OnInit {
  allCandies: Candie[] = [];
  selectedCandie: Candie;
  id: string;
  name: string = '';
  price: number = 0;
  twoPrices: boolean = false;
  price2: number = 0;
  quantity: number = 0;
  quantity2: number = 0;
  stock: number = 0;
  errorName: boolean = false;
  errorPrice: boolean = false;
  errorPrice2: boolean = false;
  errorQuantity: boolean = false;
  errorQuantity2: boolean = false;
  errorStock: boolean = false;

  constructor(private candieService: CandiesService) { }

  ngOnInit() {
    this.candieService.getAllCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Candie;
      })
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedCandie.id;
    this.name = this.selectedCandie.name;
    this.price = this.selectedCandie.price;
    this.stock = this.selectedCandie.stock;
    if(this.selectedCandie.price2){
      this.twoPrices = true;
      this.price2 = this.selectedCandie.price2;
      this.quantity = this.selectedCandie.quantity;
      this.quantity2 = this.selectedCandie.quantity2;
    }else{
      this.twoPrices = false;
    }
    this.validation();
  }

  clear(): void {
    this.selectedCandie = undefined;
    this.name = '';
    this.price = 0;
    this.price2 = 0;
    this.quantity = 0;
    this.quantity2 = 0;
    this.stock = 0;
    this.twoPrices = false;
  }

  onChangeName(): void {
    this.errorName = this.name.length <= 0 ? true : false;
  }

  onChangePrice(): void {
    this.errorPrice = this.price <= 0 ? true : false;
  }
  
  onChangePrice2(): void {
    this.errorPrice2 = this.price2 <= 0 ? true : false;
  }

  onChangeStock(): void {
    this.errorStock = this.stock < 0 ? true : false;
  }

  onChangeQuantity(): void {
    this.errorQuantity = this.quantity <= 0 ? true : false;
  }

  onChangeQuantity2(): void {
    this.errorQuantity2 = this.quantity2 <= 0 ? true : false;
  }

  create(): void {
    if(this.validation()){
      let newCandie = {
        name: this.name,
        price: this.price,
        stock: this.stock
      } as Candie;
      if(this.twoPrices){
        newCandie.price2 = this.price2;
        newCandie.quantity = this.quantity;
        newCandie.quantity2 = this.quantity2;
      }
      this.candieService.create(newCandie);
      this.clear();
    }
  }

  update(): void {
    if(this.validation()){
      this.selectedCandie.name = this.name;
      this.selectedCandie.price = this.price;
      this.selectedCandie.stock = this.stock;
      if(this.twoPrices){
        this.selectedCandie.price2 = this.price2;
        this.selectedCandie.quantity = this.quantity;
        this.selectedCandie.quantity2 = this.quantity2;
      }
      this.candieService.update(this.selectedCandie);
      this.clear();
    }
  }

  delete(): void {
    this.candieService.delete(this.selectedCandie);
    this.clear();
  }

  validation(): boolean{
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    this.errorStock = this.stock < 0 ? true : false;
    if (this.errorName || this.errorPrice || this.errorStock) {
      return false;
    }
    if (this.twoPrices) {
      this.errorPrice2 = this.price2 <= 0 ? true : false;
      this.errorQuantity = this.quantity <= 0 ? true : false;
      this.errorQuantity2 = this.quantity2 <= 0 ? true : false;
      if (this.errorPrice2 || this.errorQuantity || this.errorQuantity2) {
        return false;
      }
    }
    return true;
  }

}
