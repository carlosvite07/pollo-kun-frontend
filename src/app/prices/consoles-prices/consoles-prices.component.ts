import { Component, OnInit } from '@angular/core';
import { ConsolesService } from '../../consoles/shared/consoles.service';
import { Console } from '../../consoles/shared/console.model';

@Component({
  selector: 'app-consoles-prices',
  templateUrl: './consoles-prices.component.html',
  styleUrls: ['./consoles-prices.component.scss']
})
export class ConsoleComponent implements OnInit {
  allConsoles: Console[] = [];
  selectedConsole: Console;
  id: string;
  name: string = '';
  hourPrice: number = 0;
  halfHourPrice: number = 0;
  type: number = undefined;
  errorName: boolean = false;
  errorHourPrice: boolean = false;
  errorHalfHourPrice: boolean = false;
  errorType: boolean = false;

  constructor(private recordService: ConsolesService) { }

  ngOnInit() {
    this.recordService.getConsoles().subscribe(data => {
      this.allConsoles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Console;
      })
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedConsole.id;
    this.name = this.selectedConsole.name;
    this.hourPrice = this.selectedConsole.hourPrice;
    this.halfHourPrice = this.selectedConsole.halfHourPrice;
    this.validation();
  }

  clear(): void {
    this.selectedConsole = undefined;
    this.name = '';
    this.hourPrice = 0;
    this.halfHourPrice = 0;
    this.type = undefined;
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

  onChangeConsoleType(): void {
    this.errorType = this.type === undefined ? true : false;
  }
  
  create(): void {
    if(this.validation()){
      this.errorType = this.type === undefined ? true : false;
      if(!this.errorType){
        let newConsole = {
          name: this.name,
          hourPrice: this.hourPrice,
          halfHourPrice: this.halfHourPrice,
          available: true,
          type: this.type == 1 ? 'one' : '360'
        } as Console;
        this.recordService.create(newConsole);
        this.clear()
      }
    }
  }

  update(): void{
    if(this.validation()){
      this.selectedConsole.name = this.name;
      this.selectedConsole.hourPrice = this.hourPrice;
      this.selectedConsole.halfHourPrice = this.halfHourPrice;
      this.recordService.update(this.selectedConsole);
      this.clear();
    }
  }

  delete(): void{
    this.recordService.delete(this.selectedConsole);
    this.clear();
  }

  validation(): boolean{
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorHourPrice = this.hourPrice <= 0 ? true : false;
    this.errorHalfHourPrice = this.halfHourPrice <= 0 ? true : false;
    if(this.errorName || this.errorHourPrice || this.errorHalfHourPrice){
      return false;
    }
    return true;
  }

}


/*
Cliente

Agregar nuevo cliente

Cliente 1

Consolas | Dulces | Computadora |  Trabajos e Impresiones | Papelería

1 XBOX 360 1 hora -> Agregar tiempo, Terminar
1 Pau Pau -> Quitar Pagado []
1 Palomitas -> Quitar Pagado

Cliente 2 Terminar
Consolas | Dulces | Computadora |  Trabajos e Impresiones | Papelería

6 Computadora -> Terminar
1 Impresión
1 Folder -> Quitar

Cliente 3
Consolas | Dulces | Computadora |  Trabajos e Impresiones | Papelería

2 Copias
3 Ampliaciones
3 Copias Oficio
1 Prit -> Quitar
1 impresión fallida


client = {
  consoleRecords = [
    {..},
    price: 15,
  ]
  candiesPurchase = [
    {..},
  ],
  pcRecord = [
    {..},
  ]
  worksPurchase = [
    {..},
  ],
  articlePurchase = [
    {..},
  ]

}

*/
