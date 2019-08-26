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

  onChangeCandieSelection(): void {
    this.id = this.selectedCandie.id;
    this.name = this.selectedCandie.name;
    this.price = this.selectedCandie.price;
    this.price2 = this.selectedCandie.price || 0;
    this.quantity = this.selectedCandie.quantity;
    this.quantity2 = this.selectedCandie.quantity2 || 0;
    this.stock = this.selectedCandie.stock;
  }

  clear(): void {
    this.selectedCandie = undefined;
    this.name = '';
    this.price = 0;
    this.price2 = 0;
    this.quantity = 0;
    this.quantity2 = 0;
    this.stock = 0;
  }

  onChangeName(): void {
    this.errorName = this.name.length <= 0 ? true : false;
  }
  
  onChangePrice(): void {
    this.errorPrice = this.price <= 0 ? true : false;
  }

  onChangeQuantity(): void {
    this.errorQuantity = this.quantity <= 0 ? true : false;
  }
  
  onChangeStock(): void{
    this.errorStock = this.stock <= 0 ? true : false;
  }

  createCandie(): void {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    this.errorPrice2 = this.price2 < 0 ? true : false;
    this.errorQuantity = this.quantity < 0 ? true : false;
    this.errorQuantity2 = this.quantity < 0 ? true : false;
    this.errorStock = this.stock <= 0 ? true : false;
    if(this.errorName || this.errorPrice || this.errorPrice2 || 
      this.errorQuantity || this.errorQuantity2 || this.errorStock ){
      return;
    }
    let newCandie;
    if(this.price2 > 0){
      this.errorQuantity2 = this.quantity <= 0 ? true : false;
      if(this.errorQuantity2){
        return;
      }
      newCandie = {
        name: this.name,
        price: this.price,
        price2: this.price2,  
        quantity: this.quantity,  
        quantity2: this.quantity2,  
        stock: this.stock
      } as Candie;
    }else{
      newCandie = {
        name: this.name,
        price: this.price,  
        stock: this.stock
      } as Candie;
    }
    this.candieService.createCandie(newCandie);
    this.clear();
  }

  updateCandie(): void{
    this.selectedCandie.name = this.name;
    this.candieService.updateCandie(this.selectedCandie);
    this.clear();
  }

  deleteCandie(): void{
    this.candieService.deleteCandie(this.selectedCandie);
    this.clear();
  }

}
