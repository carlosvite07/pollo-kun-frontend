import { Component, OnInit } from '@angular/core';
import { ComputersService } from '../../computers/computers.service';
import { Computer } from '../../computers/computer.model';

@Component({
  selector: 'app-computers-prices',
  templateUrl: './computers-prices.component.html',
  styleUrls: ['./computers-prices.component.scss']
})
export class ComputersPricesComponent implements OnInit {
  allComputers: Computer[] = [];
  selectedComputer: Computer;
  id: string;
  name: string = '';
  hourPrice: number = 0;
  halfHourPrice: number = 0;
  fiftenMinutesPrice: number = 0;
  errorName: boolean = false;
  errorHourPrice: boolean = false;
  errorHalfHourPrice: boolean = false;
  errorTenMinutesPrice: boolean = false;

  constructor(private computersService: ComputersService) {}

  ngOnInit() {
    this.computersService.getComputers().subscribe(data => {
      this.allComputers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Computer;
      });
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedComputer.id;
    this.name = this.selectedComputer.name;
    this.hourPrice = this.selectedComputer.hourPrice;
    this.halfHourPrice = this.selectedComputer.halfHourPrice;
    this.fiftenMinutesPrice = this.selectedComputer.fiftenMinutesPrice;
    this.validation();
  }

  clear(): void {
    this.selectedComputer = undefined;
    this.name = '';
    this.hourPrice = 0;
    this.halfHourPrice = 0;
    this.fiftenMinutesPrice = 0;
  }

  onChangeName(): void {
    this.errorName = this.name.length <= 0 ? true : false;
  }

  onChangeHourPrice(): void {
    this.errorHourPrice = this.hourPrice <= 0 ? true : false;
  }

  onChangeHalfHourPrice(): void {
    this.errorHalfHourPrice = this.halfHourPrice <= 0 ? true : false;
  }

  onChangeTenMinutesPrice(): void {
    this.errorTenMinutesPrice = this.fiftenMinutesPrice <= 0 ? true : false;
  }

  create(): void {
    if (this.validation()) {
      let newComputer = {
        name: this.name,
        available: true,
        hourPrice: this.hourPrice,
        halfHourPrice: this.halfHourPrice,
        fiftenMinutesPrice: this.fiftenMinutesPrice
      } as Computer;
      this.computersService.create(newComputer);
      this.clear();
    }
  }

  update(): void {
    if (this.validation()) {
      this.selectedComputer.name = this.name;
      this.selectedComputer.hourPrice = this.hourPrice;
      this.selectedComputer.halfHourPrice = this.halfHourPrice;
      this.selectedComputer.fiftenMinutesPrice = this.fiftenMinutesPrice;
      this.computersService.update(this.selectedComputer);
      this.clear();
    }
  }

  delete(): void {
    this.computersService.delete(this.selectedComputer);
    this.clear();
  }

  validation(): boolean {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorHourPrice = this.hourPrice <= 0 ? true : false;
    this.errorHalfHourPrice = this.halfHourPrice <= 0 ? true : false;
    this.errorTenMinutesPrice = this.fiftenMinutesPrice <= 0 ? true : false;
    if (
      this.errorName ||
      this.errorHourPrice ||
      this.errorHalfHourPrice ||
      this.errorTenMinutesPrice
    ) {
      return false;
    }
    return true;
  }
}
