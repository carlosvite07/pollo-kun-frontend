import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from './summary.service';
import { Record } from '../hours/shared/record.model';
import { CandiePurchase } from '../candies/candie-purchase.model';
import { WorkRecord } from '../works/work-record.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  now = new Date();

  allRecords: Record[] = [];
  recordsTotal: number = 0;
  allCandies: CandiePurchase[] = [];
  candiesTotal: number = 0;
  allWorks: WorkRecord[] = [];
  worksTotal: number = 0;
  total: number = 0;
  
  constructor(
    calendar: NgbCalendar,
    private summaryService: SummaryService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit() {
    let start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 0, 0);
    let end = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1, 0, 0);
    this.getSummaryByDate(start, end);
  }

  onDateSelection(date: NgbDate) {
    let start;
    let end;

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;      
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if(!this.toDate){
      start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 0, 0);
      end = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1, 0, 0);
    }else{
      start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 0, 0);
      end = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1, 0, 0);
    }
    this.getSummaryByDate(start, end);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  getSummaryByDate(start: Date, end: Date): void {
    this.total = 0;
  
    this.recordsTotal = 0;
    this.summaryService.getRecordsByRange(start, end).subscribe(data => {
      this.allRecords = data.map(e => {
        let record = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
        this.recordsTotal += record.price;
        record.startDate = record.startDate.toDate();
        record.endDate = record.endDate.toDate();
        return record as Record;
      });
    });

    this.candiesTotal = 0;
    this.summaryService.getCandiesByRange(start, end).subscribe(data => {
      this.allCandies = data.map(e => {
        let candie = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
        this.candiesTotal += candie.price;
        candie.date = candie.date.toDate();
        return candie as CandiePurchase;
      });
    });

    this.worksTotal = 0;
    this.summaryService.getWorksByRange(start, end).subscribe(data => {
      this.allWorks = data.map(e => {
        let work = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
        this.worksTotal += work.price;
        work.date = work.date.toDate();
        return work as WorkRecord;
      });
    });

  }

}

/*

Crear cliente

Cliente 1 (btnFinalizar TOtal -> Modal Total Cliente 1){

  Multiselect de lo que se va agregar
  
  Dashboard de lo que lleva


}

Cliente 
  - Consola (agregar tiempo)
  - PC (Iniciar un conteo)
  - Dulces
  - Trabajo, Impresiones
  - Papeleria


*/