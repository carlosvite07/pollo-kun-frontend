import { Component, OnInit } from '@angular/core';
import { WorksService } from './works.service';
import { Work } from './work.model';
import { WorkRecord } from './work-record.model';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  allWorks: Work[] = [];
  selectedWork: Work;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorWork: boolean = false;
  errorQuantity: boolean = false;
  successRecord = false;
  unknowWork: boolean = false;
  specificWork: string;
  errorSpecificWork: boolean = false;
  errorPrice: boolean = false;

  constructor(private worksService: WorksService) { }

  ngOnInit() {
    this.worksService.getWorks().subscribe(data => {
      this.allWorks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Console;
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

  workRecordConfirm(): void {
    this.errorWork = !this.selectedWork;
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
    this.worksService.workRecord(newRecord);
    this.selectedWork = undefined;
    this.selectedQuantity = 1;
    this.specificWork = undefined;
    this.unknowWork = undefined;
    this.showSuccesRecord();
  }

  showSuccesRecord() {
    this.successRecord = true;
    setTimeout(() => {
      this.successRecord = false;
    }, 3000)
  }




}
