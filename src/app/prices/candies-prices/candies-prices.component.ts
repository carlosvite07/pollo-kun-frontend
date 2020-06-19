import { Component, OnInit } from '@angular/core';
import { CandiesService } from '../../candies/candies.service';
import { Candie } from '../../candies/candie.model';

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
  history: Array<object> = [];
  stock: number;
  unitary: number;
  errorName: boolean = false;
  errorPrice: boolean = false;
  errorStock: boolean = false;
  errorUnitary: boolean = false;
  errorHistory: Array<object> = [];

  constructor(private candieService: CandiesService) {}

  ngOnInit() {
    this.candieService.getAllCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        const data = e.payload.doc.data() as Candie;
        return {
          id: e.payload.doc.id,
          name: data.name,
          price: data.price,
          history: data.history
        } as Candie;
      });
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedCandie.id;
    this.name = this.selectedCandie.name;
    this.price = this.selectedCandie.price;
    this.history = this.selectedCandie.history;
    this.validation();
  }

  clear(): void {
    this.selectedCandie = undefined;
    this.name = '';
    this.price = 0;
    this.stock = 0;
    this.unitary = 0;
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

  onChangeUnitary(): void {
    this.errorUnitary = this.unitary <= 0 ? true : false;
  }

  addHistory() {
    this.selectedCandie.history.push({
      stock: 0,
      unitary: 0
    });
  }

  removeHistory(index) {
    this.selectedCandie.history.splice(index, 1);
  }

  create(): void {
    const history = {
      stock: this.stock,
      unitary: this.unitary
    };
    if (this.validation()) {
      let newCandie = {
        name: this.name,
        price: this.price,
        history: [history]
      } as Candie;
      this.candieService.create(newCandie);
      this.clear();
    }
  }

  update(): void {
    if (this.validation()) {
      this.selectedCandie.name = this.name;
      this.selectedCandie.price = this.price;
      this.candieService.update(this.selectedCandie);
      this.clear();
    }
  }

  delete(): void {
    this.candieService.delete(this.selectedCandie);
    this.clear();
  }

  validation(): boolean {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    if (this.errorName || this.errorPrice) {
      return false;
    }
    if (this.selectedCandie) {
      const errorArr = {
        stock: false,
        unitary: false
      };
      this.selectedCandie.history.forEach((element, index) => {
        errorArr.stock = element.stock < 0;
        errorArr.unitary = element.unitary <= 0;
        this.errorHistory[index] = errorArr;
        if (element.stock < 0 || element.unitary <= 0) {
          return false;
        }
      });
    } else {
      this.errorStock = this.stock < 0 ? true : false;
      this.errorUnitary = this.unitary <= 0 ? true : false;
      if (this.errorStock || this.errorUnitary) {
        return false;
      }
    }
    return true;
  }
}
