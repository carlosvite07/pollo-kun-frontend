import { Component, OnInit } from "@angular/core";
import { ElectronicsService } from "../../electronics/electronics.service";
import { Electronic } from "../../electronics/electronic.model";

@Component({
  selector: "app-electronics-prices",
  templateUrl: "./electronics-prices.component.html",
  styleUrls: ["./electronics-prices.component.scss"],
})
export class ElectronicsPricesComponent implements OnInit {
  allElectronics: Electronic[] = [];
  selectedElectronic: Electronic;
  id: string;
  name: string = "";
  price: number = 0;
  history: Array<object> = [];
  stock: number;
  unitary: number;
  errorName: boolean = false;
  errorPrice: boolean = false;
  errorStock: boolean = false;
  errorUnitary: boolean = false;
  errorHistory: Array<object> = [];

  constructor(private electronicService: ElectronicsService) {}

  ngOnInit() {
    this.electronicService.getAllElectronics().subscribe((data) => {
      this.allElectronics = data.map((e) => {
        const data = e.payload.doc.data() as Electronic;
        return {
          id: e.payload.doc.id,
          name: data.name,
          price: data.price,
          history: data.history,
        } as Electronic;
      });
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedElectronic.id;
    this.name = this.selectedElectronic.name;
    this.price = this.selectedElectronic.price;
    this.history = this.selectedElectronic.history;
    this.validation();
  }

  clear(): void {
    this.selectedElectronic = undefined;
    this.name = "";
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
    this.selectedElectronic.history.push({
      stock: 0,
      unitary: 0,
    });
  }

  removeHistory(index) {
    this.selectedElectronic.history.splice(index, 1);
  }

  create(): void {
    const history = {
      stock: this.stock,
      unitary: this.unitary,
    };
    if (this.validation()) {
      let newElectronic = {
        name: this.name,
        price: this.price,
        history: [history],
      } as Electronic;
      console.log(newElectronic);
      this.electronicService.create(newElectronic);
      this.clear();
    }
  }

  update(): void {
    if (this.validation()) {
      this.selectedElectronic.name = this.name;
      this.selectedElectronic.price = this.price;
      this.electronicService.update(this.selectedElectronic);
      this.clear();
    }
  }

  delete(): void {
    this.electronicService.delete(this.selectedElectronic);
    this.clear();
  }

  validation(): boolean {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    if (this.errorName || this.errorPrice) {
      return false;
    }
    if (this.selectedElectronic) {
      const errorArr = {
        stock: false,
        unitary: false,
      };
      this.selectedElectronic.history.forEach((element, index) => {
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
