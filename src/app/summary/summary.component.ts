import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from './summary.service';
import { ConsoleRecord } from '../consoles/shared/console-record.model';
import { CandiePurchase } from '../candies/candie-purchase.model';
import { WorkRecord } from '../works/work-record.model';
import { ArticlePurchase } from '../articles/article-purchase.model';

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

  recordsTotal: number = 0;
  totalHours: number = 0;
  oneRecords: ConsoleRecord[] = [];
  oneTotal: number = 0;
  oneHours: number = 0;
  threeSixtyRecords: ConsoleRecord[] = [];
  threeSixtyTotal: number = 0;
  threeSixtyHours: number = 0;
  allCandies: CandiePurchase[] = [];
  candiesTotal: number = 0;
  allWorks: WorkRecord[] = [];
  worksTotal: number = 0;
  articlesTotal: number = 0;
  allArticles: ArticlePurchase[] = [];
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

    if (!this.toDate) {
      start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 0, 0);
      end = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1, 0, 0);
    } else {
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

    this.summaryService.getRecordsByRange(start, end).subscribe(data => {
      this.recordsTotal = 0;
      this.totalHours = 0;
      this.oneRecords = [];
      this.oneTotal = 0;
      this.oneHours = 0;
      this.threeSixtyRecords = [];
      this.threeSixtyTotal = 0;
      this.threeSixtyHours = 0;
      data.forEach(element => {
        let record = {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        };
        this.recordsTotal += record.price;
        record.startDate = record.startDate.toDate();
        record.endDate = record.endDate.toDate();
        this.totalHours += record.hours;
        if (record.console.type === 'one'){
          this.oneRecords.push(record as ConsoleRecord);
          this.oneTotal += record.price;
          this.oneHours += record.hours;
        }else{
          this.threeSixtyRecords.push(record as ConsoleRecord);
          this.threeSixtyTotal += record.price;
          this.threeSixtyHours += record.hours;
        }

      });
    });

    this.summaryService.getCandiesByRange(start, end).subscribe(data => {
      this.candiesTotal = 0;
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

    this.summaryService.getWorksByRange(start, end).subscribe(data => {
      this.worksTotal = 0;
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

    this.summaryService.getArticlesByRange(start, end).subscribe(data => {
      this.articlesTotal = 0;
      this.allArticles = data.map(e => {
        let article = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
        this.articlesTotal += article.price;
        article.date = article.date.toDate();
        return article as ArticlePurchase;
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