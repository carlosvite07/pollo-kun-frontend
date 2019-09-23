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
  stock: number = 0;
  errorName: boolean = false;
  errorPrice: boolean = false;
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
    this.validation();
  }

  clear(): void {
    this.selectedCandie = undefined;
    this.name = '';
    this.price = 0;
    this.stock = 0;
  }

  onChangeName(): void {
    this.errorName = this.name.length <= 0 ? true : false;
  }

  onChangePrice(): void {
    this.errorPrice = this.price <= 0 ? true : false;
  }

  onChangeStock(): void {
    this.errorStock = this.stock < 0 ? true : false;
  }

  create(): void {
    if(this.validation()){
      let newCandie = {
        name: this.name,
        price: this.price,
        stock: this.stock
      } as Candie;
      this.candieService.create(newCandie);
      this.clear();
    }
  }

  update(): void {
    if(this.validation()){
      this.selectedCandie.name = this.name;
      this.selectedCandie.price = this.price;
      this.selectedCandie.stock = this.stock;
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
    return true;
  }

}
