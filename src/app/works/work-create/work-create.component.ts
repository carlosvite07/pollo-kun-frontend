import { Component, OnInit, Input } from '@angular/core';
import { Work } from '../work.model';
import { WorkRecord } from '../work-record.model';
import { WorksService } from '../works.service';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
  styleUrls: ['./work-create.component.scss']
})
export class WorkCreateComponent implements OnInit {
  @Input() client;
  allWorks: Work[] = [];
  selectedWork: Work;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorWork: boolean = false;
  errorQuantity: boolean = false;
  unknowWork: boolean = false;
  specificWork: string;
  errorSpecificWork: boolean = false;
  errorPrice: boolean = false;

  constructor(
    private worksService: WorksService,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.worksService.getWorks().subscribe(data => {
      this.allWorks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Work;
      });
    });
  }

  onChangeSelection(): void {
    this.unknowWork = this.selectedWork.name === "Otro";
    this.selectedPrice = this.selectedWork.price || 0;
    this.errorWork = false;
  }

  onChangeQuantity(): void {
    this.errorQuantity = this.selectedQuantity <= 0;
  }

  onChangePrice(): void {
    this.errorPrice = this.selectedPrice <= 0;
  }

  onChangeSpecificWork(): void{
    this.errorSpecificWork = this.specificWork.length < 5;
  }

  workRecord(): void {
    this.errorWork = (this.selectedWork) ? false : true;
    this.errorQuantity = this.selectedQuantity <= 0;
    if (this.errorWork || this.errorQuantity) {
      return;
    }
    let newRecord = {
      date: new Date(),
      name: this.selectedWork.name,
      quantity: this.selectedQuantity,
      price: this.selectedQuantity * this.selectedPrice
    } as WorkRecord;
    if(this.unknowWork){
      this.errorSpecificWork = !this.specificWork;
      this.errorPrice = this.selectedPrice <= 0;
      if(this.errorSpecificWork || this.errorPrice){
        return;
      }
      newRecord.name += ' '+this.specificWork;
    }
    if (!this.client.worksRecords) {
      this.client.worksRecords = [];
    }
    this.client.worksRecords.unshift(newRecord);
    this.clientsService.update(this.client);
    this.selectedWork = undefined;
    this.selectedQuantity = 1;
    this.specificWork = undefined;
    this.unknowWork = false;
  }

}
