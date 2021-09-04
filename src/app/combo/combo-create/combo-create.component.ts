import { Component, OnInit, Input } from '@angular/core';

import { Candie } from '../../candies/candie.model';
import { CandiePurchase } from '../../candies/candie-purchase.model';
import { CandiesService } from '../../candies/candies.service';
import { Client } from '../../clients/client.model';
import { ClientsService } from '../../clients/clients.service';
import { ComputersService } from '../../computers/computers.service';
import { ComputerRecord } from '../../computers/computer-record.model';
import { ConsolesService } from '../../consoles/shared/consoles.service';
import { ConsoleRecord } from '../../consoles/shared/console-record.model';

@Component({
  selector: 'app-combo-create',
  templateUrl: './combo-create.component.html',
  styleUrls: ['./combo-create.component.scss']
})
export class ComboCreateComponent implements OnInit {
  @Input() client: Client;
  allConsolesAndComputers: any[] = [];
  consolesRecords: ConsoleRecord[] = [];

  selectedConsoleOrComputer: any;
  errorConsoleOrComputer: Boolean = false;

  firstProducts: Candie[] = [];
  secondProducts: Candie[] = [];
  selectedFirstProduct: Candie;
  selectedSecondProduct: Candie;
  errorFirstProduct: boolean = false;

  secondProductDisabled: Boolean = true;

  softDrinks = [
    'Boing',
    'Chaparrita',
    'Coca Chica 250ml',
    'Coca Grande 400ml',
    'Delaware Punch',
    'Jarritos Chico 355ml',
    'Jarritos Grande 600ml',
    'Levite Bonafont',
    'Red Cola'
  ];

  maruchan = 'Maruchan';
  sabritas = 'Sabritas (cualquiera)';

  constructor(
    private candiesService: CandiesService,
    private clientsService: ClientsService,
    private computersService: ComputersService,
    private consolesService: ConsolesService
  ) {}

  ngOnInit() {
    this.consolesService.getConsoles().subscribe(data => {
      const consolesAndComputers = [];
      data.forEach(e => {
        consolesAndComputers.push({
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        });
      });

      this.computersService.getComputers().subscribe(data => {
        data.forEach(e => {
          consolesAndComputers.push({
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          });
        });
      });
      this.allConsolesAndComputers = consolesAndComputers;
    });

    this.candiesService.getAllCandies().subscribe(data => {
      let comboProducts = [];
      data.forEach(e => {
        const candieResp = e.payload.doc.data() as Candie;
        if (
          (this.softDrinks.includes(candieResp.name) ||
            candieResp.name === this.maruchan ||
            candieResp.name === this.sabritas) &&
          candieResp.history.some(el => el.stock > 0)
        ) {
          comboProducts.push({
            id: e.payload.doc.id,
            name: candieResp.name,
            price: candieResp.price,
            history: candieResp.history
          } as Candie);
        }
      });
      this.firstProducts = comboProducts;
    });
  }

  onSelectFirstProduct(): void {
    this.secondProductDisabled =
      this.selectedFirstProduct.name === this.maruchan;
    if (this.softDrinks.includes(this.selectedFirstProduct.name)) {
      let secondProducts = [];
      this.firstProducts.forEach(product => {
        if (
          !this.softDrinks.includes(product.name) &&
          product.name !== this.maruchan
        ) {
          secondProducts.push(product);
        }
      });
      this.secondProducts = secondProducts;
    }
    if (this.selectedFirstProduct.name === this.sabritas) {
      this.secondProducts = this.firstProducts.filter(
        product =>
          product.name !== this.sabritas && product.name !== this.maruchan
      );
    }
  }

  getExtraEndDate(now: Date, extraTime: number): Date {
    return new Date(now.getTime() + (1 + extraTime) * 60 * 60 * 1000);
  }

  getEndDate(now: Date): Date {
    return new Date(now.getTime() + 1 * 60 * 60 * 1000);
  }

  createCombo(): void {
    this.errorConsoleOrComputer = this.selectedConsoleOrComputer ? false : true;
    this.errorFirstProduct = this.selectedFirstProduct ? false : true;
    if (this.errorConsoleOrComputer || this.errorFirstProduct) {
      return;
    }
    let extraTime = 0.5;
    if (
      this.selectedFirstProduct.name === this.maruchan ||
      this.selectedSecondProduct
    ) {
      extraTime = 1;
    }

    const now = new Date();
    const endDate = this.getExtraEndDate(now, extraTime);

    if (this.selectedConsoleOrComputer.hasOwnProperty('type')) {
      this.makeConsoleRecord(now, endDate, extraTime);
    } else {
      this.makeComputerRecord(now, extraTime);
    }

    this.buyAProduct(this.selectedFirstProduct);
    if (this.selectedSecondProduct) {
      this.buyAProduct(this.selectedSecondProduct);
      this.selectedSecondProduct = undefined;
    }
  }

  makeConsoleRecord(now: Date, endDate: Date, extraTime: number): void {
    const price = this.consolesService.getConsoleRecordPrice(
      now,
      this.getEndDate(now),
      this.selectedConsoleOrComputer
    );
    const newRecord = {
      startDate: now,
      endDate,
      console: this.selectedConsoleOrComputer,
      price,
      finished: false,
      hours: 1 + extraTime,
      paid: false,
      combo: true
    } as ConsoleRecord;
    if (!this.client.consolesRecords) {
      this.client.consolesRecords = [];
    }
    this.client.consolesRecords.unshift(newRecord);
    this.consolesService.createRecord(
      this.selectedConsoleOrComputer.id,
      this.client
    );
    this.selectedConsoleOrComputer = undefined;
  }

  makeComputerRecord(now: Date, extraTime: number): void {
    let newComputerRecord = {
      startDate: now,
      computer: this.selectedConsoleOrComputer,
      finished: false,
      paid: false,
      combo: true
    } as ComputerRecord;
    const endDate = this.getEndDate(now);
    const extraEndDate = this.getExtraEndDate(now, extraTime);
    newComputerRecord.endDate = extraEndDate;
    newComputerRecord.price = this.computersService.getComputerRecordPrice(
      now,
      endDate,
      this.selectedConsoleOrComputer
    );
    const minutesAndHours = this.computersService.getMinutesAndHours(
      now,
      extraEndDate
    );
    newComputerRecord.hours = minutesAndHours.hours;
    newComputerRecord.minutes = minutesAndHours.minutes;

    if (!this.client.computersRecords) {
      this.client.computersRecords = [];
    }
    this.client.computersRecords.unshift(newComputerRecord);
    this.computersService.createRecord(
      this.selectedConsoleOrComputer.id,
      this.client
    );
    this.selectedConsoleOrComputer = undefined;
  }

  buyAProduct(selectedProduct: Candie): void {
    let quantityBuyed = 1;
    const history = selectedProduct.history;

    if (!this.client.candiesPurchases) {
      this.client.candiesPurchases = [];
    }

    selectedProduct.history.forEach((element, index) => {
      if (element.stock < quantityBuyed) {
        if (element.stock !== 0 && quantityBuyed !== 0) {
          quantityBuyed -= element.stock;
          this.createPurchase(
            selectedProduct.price,
            element.unitary,
            element.stock,
            selectedProduct
          );
          history[index].stock = 0;
          this.candiesService.updateHistory(selectedProduct.id, history);
        }
      } else {
        if (quantityBuyed !== 0) {
          this.createPurchase(
            selectedProduct.price,
            element.unitary,
            quantityBuyed,
            selectedProduct
          );
          history[index].stock -= quantityBuyed;
          quantityBuyed = 0;
          this.candiesService.updateHistory(selectedProduct.id, history);
        }
      }
    });

    selectedProduct = undefined;
  }

  createPurchase(
    candiePrice: number,
    unitary: number,
    quantityBuyed: number,
    candie: Candie
  ): void {
    const profit = (candiePrice - unitary) * quantityBuyed;
    const newPurchase = {
      date: new Date(),
      candie: candie,
      quantity: quantityBuyed,
      price: quantityBuyed * candiePrice,
      paid: false,
      profit: parseFloat(profit.toFixed(2)),
      unitary: unitary,
      combo: true
    } as CandiePurchase;
    this.client.candiesPurchases.unshift(newPurchase);
    this.clientsService.update(this.client);
  }
}
