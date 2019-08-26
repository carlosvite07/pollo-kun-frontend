import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../hours/shared/record.service';
import { Console } from '../../hours/shared/console.model'

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  allConsoles: Console[] = [];
  selectedConsole: Console;
  consoleId: string;
  name: string = '';
  hourPrice: number = 0;
  halfHourPrice: number = 0;
  type: number = undefined;
  errorName: boolean = false;
  errorHourPrice: boolean = false;
  errorHalfHourPrice: boolean = false;
  errorType: boolean = false;

  constructor(private recordService: RecordService) { }

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

  onChangeConsoleSelection(): void {
    this.consoleId = this.selectedConsole.id;
    this.name = this.selectedConsole.name;
    this.hourPrice = this.selectedConsole.hourPrice;
    this.halfHourPrice = this.selectedConsole.halfHourPrice;
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
  
  createConsole(): void {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorHourPrice = this.hourPrice <= 0 ? true : false;
    this.errorHalfHourPrice = this.halfHourPrice <= 0 ? true : false;
    this.errorType = this.type === undefined ? true : false;
    if(this.errorName || this.errorHourPrice || this.errorHalfHourPrice || this.errorType){
      return;
    }
    let newConsole = {
      name: this.name,
      hourPrice: this.hourPrice,
      halfHourPrice: this.halfHourPrice,
      available: true,
      type: this.type == 1 ? 'one' : '360'
    } as Console;
    this.recordService.createConsole(newConsole);
    this.clear()
  }

  updateConsole(): void{
    this.selectedConsole.name = this.name;
    this.selectedConsole.hourPrice = this.hourPrice;
    this.selectedConsole.halfHourPrice = this.halfHourPrice;
    this.recordService.updateConsole(this.selectedConsole);
    this.clear();
  }

  deleteConsole(): void{
    this.recordService.deleteConsole(this.selectedConsole);
    this.clear();
  }

}
