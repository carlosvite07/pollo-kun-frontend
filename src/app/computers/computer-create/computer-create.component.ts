import { Component, OnInit, Input } from '@angular/core';
import { ComputersService } from '../computers.service'
import { Computer } from '../computer.model';
import { ComputerRecord } from '../computer-record.model';

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {
  @Input() client;
  allComputers: Computer[];
  selectedComputer: Computer = undefined;
  errorComputer: boolean = false;

  constructor(private computersService: ComputersService) { }

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

  onChangeSelection(){
    this.errorComputer = this.selectedComputer ? false : true; 
  }

  makeARecord() {
    this.errorComputer = this.selectedComputer ? false : true; 
    if(this.errorComputer){
      return;
    }
    let now = new Date();
    let newComputerRecord = {
      startDate: now,
      computer: this.selectedComputer,
      finished: false,
      paid: false,
    } as ComputerRecord;
    if(!this.client.computersRecords){
      this.client.computersRecords = [];
    }
    this.client.computersRecords.unshift(newComputerRecord);
    this.computersService.createRecord(this.selectedComputer.id, this.client);
    this.selectedComputer = undefined;
  }

}
