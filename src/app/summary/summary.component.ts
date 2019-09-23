import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from './summary.service';
import { ConsoleRecord } from '../consoles/shared/console-record.model';
import { CandiePurchase } from '../candies/candie-purchase.model';
import { WorkRecord } from '../works/work-record.model';
import { ArticlePurchase } from '../articles/article-purchase.model';
import { Client } from '../clients/client.model';
import { Computer } from '../computers/computer.model';

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
  allComputers: Computer[] = [];
  computersTotal: number = 0;
  totalComputersHours: number = 0;
  totalComputersMinutes: number = 0;
  allWorks: WorkRecord[] = [];
  worksTotal: number = 0;
  articlesTotal: number = 0;
  allArticles: ArticlePurchase[] = [];

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
    this.summaryService.getClientsByRange(start, end).subscribe(clients => {
      let articlesPurchases = [];
      let consolesRecords = [];
      let candiesPurchases = [];
      let computersRecords = [];
      let worksRecords = [];

      clients.forEach(client => {
        let currentClient = client.payload.doc.data() as Client;
        if (currentClient.finished) {
          if (currentClient.articlesPurchases && currentClient.articlesPurchases.length > 0) {
            currentClient.articlesPurchases.forEach(el => {
              articlesPurchases.push(el)
            });
          }
          if (currentClient.consolesRecords) {
            currentClient.consolesRecords.forEach(el => {
              consolesRecords.push(el)
            });
          }
          if (currentClient.candiesPurchases && currentClient.candiesPurchases.length > 0) {
            currentClient.candiesPurchases.forEach(el => {
              candiesPurchases.push(el)
            });
          }
          if (currentClient.computersRecords && currentClient.computersRecords.length > 0) {
            currentClient.computersRecords.forEach(el => {
              computersRecords.push(el)
            });
          }
          if (currentClient.worksRecords) {
            currentClient.worksRecords.forEach(el => {
              worksRecords.push(el)
            });
          }
        }
      });

      this.showArticlesPurchases(articlesPurchases);
      this.showConsolesRecords(consolesRecords);
      this.showComputersRecords(computersRecords);
      this.showCandiesPurchases(candiesPurchases);
      this.showWorksRecords(worksRecords);
    });
  }

  showConsolesRecords(consolesRecords) {
    this.recordsTotal = 0;
    this.totalHours = 0;
    this.oneRecords = [];
    this.oneTotal = 0;
    this.oneHours = 0;
    this.threeSixtyRecords = [];
    this.threeSixtyTotal = 0;
    this.threeSixtyHours = 0;
    consolesRecords.forEach(record => {
      this.recordsTotal += record.price;
      record.startDate = record.startDate.toDate();
      record.endDate = record.endDate.toDate();
      this.totalHours += record.hours;
      if (record.console.type === 'one') {
        this.oneRecords.push(record as ConsoleRecord);
        this.oneTotal += record.price;
        this.oneHours += record.hours;
      } else {
        this.threeSixtyRecords.push(record as ConsoleRecord);
        this.threeSixtyTotal += record.price;
        this.threeSixtyHours += record.hours;
      }
    });
  }

  showComputersRecords(computersRecords) {
    this.computersTotal = 0;
    this.totalComputersMinutes = 0;
    this.allComputers = computersRecords.map(computer => {
      this.computersTotal += computer.price;
      computer.startDate = computer.startDate.toDate();
      computer.endDate = computer.endDate.toDate();
      this.totalComputersMinutes += (computer.hours * 60);
      this.totalComputersMinutes += computer.minutes;
      return computer as CandiePurchase;
    });
    this.totalComputersHours = Math.floor(this.totalComputersMinutes / 60);
    this.totalComputersMinutes -= (this.totalComputersHours * 60);
  }

  showCandiesPurchases(candiesPurchases) {
    this.candiesTotal = 0;
    this.allCandies = candiesPurchases.map(candie => {
      this.candiesTotal += candie.price;
      candie.date = candie.date.toDate();
      return candie as CandiePurchase;
    });
  }

  showWorksRecords(worksRecords) {
    this.worksTotal = 0;
    this.allWorks = worksRecords.map(work => {
      this.worksTotal += work.price;
      work.date = work.date.toDate();
      return work as WorkRecord;
    });
  }

  showArticlesPurchases(articlesPurchases) {
    this.articlesTotal = 0;
    this.allArticles = articlesPurchases.map(article => {
      this.articlesTotal += article.price;
      article.date = article.date.toDate();
      return article as ArticlePurchase;
    });
  }

}