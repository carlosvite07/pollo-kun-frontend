import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from './summary.service';
import { ConsoleRecord } from '../consoles/shared/console-record.model';
import { WorkRecord } from '../works/work-record.model';
import { CandiePurchase } from '../candies/candie-purchase.model';
import { ArticlePurchase } from '../articles/article-purchase.model';
import { ElectronicPurchase } from '../electronics/electronic-purchase.model';
import { Client } from '../clients/client.model';
import { Computer } from '../computers/computer.model';
import { InitialService } from '../shared/initial.service';
import { WorksService } from '../works/works.service';
import { CandiesService } from '../candies/candies.service';
import { ArticlesService } from '../articles/articles.service';
import { ElectronicsService } from '../electronics/electronics.service';

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
  seriesRecords: ConsoleRecord[] = [];
  seriesTotal: number = 0;
  seriesHours: number = 0;
  threeSixtyRecords: ConsoleRecord[] = [];
  threeSixtyTotal: number = 0;
  threeSixtyHours: number = 0;

  allComputers: Computer[] = [];
  computersTotal: number = 0;
  totalComputersHours: number = 0;
  totalComputersMinutes: number = 0;

  allWorksRecords: WorkRecord[] = [];
  worksTotal: number = 0;

  allCandiesPurchases: CandiePurchase[] = [];
  candiesTotal: number = 0;

  allArticlesPurchases: ArticlePurchase[] = [];
  articlesTotal: number = 0;

  allElectronicsPurchases: ElectronicPurchase[] = [];
  electronicsTotal: number = 0;

  monthSelection: number = 1;
  exportableData = [];
  allWorks = [];
  allCandies = [];
  allArticles = [];
  allElectronics = [];

  constructor(
    calendar: NgbCalendar,
    private summaryService: SummaryService,
    private initialService: InitialService,
    private worksService: WorksService,
    private candiesService: CandiesService,
    private articlesService: ArticlesService,
    private electronicsService: ElectronicsService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit() {
    let start = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day,
      0,
      0
    );
    let end = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day + 1,
      0,
      0
    );
    this.getSummaryByDate(start, end);

    this.worksService.getWorks().subscribe(data => {
      this.allWorks = data.map(e => {
        return {
          Nombre: e.payload.doc.data()['name'],
          Precio: e.payload.doc.data()['price'],
          Stock: null,
          Vendidos: null,
          Tiempo: null,
          Total: null,
          Ganancia: null
        };
      });
    });

    this.candiesService.getAllCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        let stock = 0;
        e.payload.doc.data()['history'].forEach(element => {
          stock += element.stock;
        });
        return {
          Nombre: e.payload.doc.data()['name'],
          Precio: e.payload.doc.data()['price'],
          Stock: stock,
          Vendidos: 0,
          Tiempo: null,
          Total: null,
          Ganancia: null
        };
      });
    });

    this.articlesService.getAllArticles().subscribe(data => {
      this.allArticles = data.map(e => {
        let stock = 0;
        e.payload.doc.data()['history'].forEach(element => {
          stock += element.stock;
        });
        return {
          Nombre: e.payload.doc.data()['name'],
          Precio: e.payload.doc.data()['price'],
          Stock: stock,
          Vendidos: 0,
          Tiempo: null,
          Total: null,
          Ganancia: null
        };
      });
    });

    this.electronicsService.getAllElectronics().subscribe(data => {
      this.allElectronics = data.map(e => {
        let stock = 0;
        e.payload.doc.data()['history'].forEach(element => {
          stock += element.stock;
        });
        return {
          Nombre: e.payload.doc.data()['name'],
          Precio: e.payload.doc.data()['price'],
          Stock: stock,
          Vendidos: 0,
          Tiempo: null,
          Total: null,
          Ganancia: null
        };
      });
    });
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
      start = new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day,
        0,
        0
      );
      end = new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day + 1,
        0,
        0
      );
    } else {
      start = new Date(
        this.fromDate.year,
        this.fromDate.month - 1,
        this.fromDate.day,
        0,
        0
      );
      end = new Date(
        this.toDate.year,
        this.toDate.month - 1,
        this.toDate.day + 1,
        0,
        0
      );
    }
    this.getSummaryByDate(start, end);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  getSummaryByDate(start: Date, end: Date): void {
    this.summaryService.getClientsByRange(start, end).subscribe(clients => {
      let articlesPurchases = [];
      let consolesRecords = [];
      let candiesPurchases = [];
      let computersRecords = [];
      let worksRecords = [];
      let electronicsPurchases = [];

      clients.forEach(client => {
        let currentClient = client.payload.doc.data() as Client;
        if (currentClient.finished) {
          if (
            currentClient.articlesPurchases &&
            currentClient.articlesPurchases.length > 0
          ) {
            currentClient.articlesPurchases.forEach(el => {
              articlesPurchases.push(el);
            });
          }
          if (
            currentClient.electronicsPurchases &&
            currentClient.electronicsPurchases.length > 0
          ) {
            currentClient.electronicsPurchases.forEach(el => {
              electronicsPurchases.push(el);
            });
          }
          if (currentClient.consolesRecords) {
            currentClient.consolesRecords.forEach(el => {
              consolesRecords.push(el);
            });
          }
          if (
            currentClient.candiesPurchases &&
            currentClient.candiesPurchases.length > 0
          ) {
            currentClient.candiesPurchases.forEach(el => {
              candiesPurchases.push(el);
            });
          }
          if (
            currentClient.computersRecords &&
            currentClient.computersRecords.length > 0
          ) {
            currentClient.computersRecords.forEach(el => {
              computersRecords.push(el);
            });
          }
          if (currentClient.worksRecords) {
            currentClient.worksRecords.forEach(el => {
              worksRecords.push(el);
            });
          }
        }
      });

      this.showArticlesPurchases(articlesPurchases);
      this.showElectronicsPurchases(electronicsPurchases);
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
    this.seriesRecords = [];
    this.seriesTotal = 0;
    this.seriesHours = 0;
    this.threeSixtyRecords = [];
    this.threeSixtyTotal = 0;
    this.threeSixtyHours = 0;
    consolesRecords.forEach(record => {
      this.recordsTotal += record.price;
      record.startDate = record.startDate.toDate();
      record.endDate = record.endDate.toDate();
      this.totalHours += record.hours;
      if (record.console.type === 'series') {
        this.seriesRecords.push(record as ConsoleRecord);
        this.seriesTotal += record.price;
        this.seriesHours += record.hours;
      }
      if (record.console.type === 'one') {
        this.oneRecords.push(record as ConsoleRecord);
        this.oneTotal += record.price;
        this.oneHours += record.hours;
      }
      if (record.console.type === '360') {
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
      this.totalComputersMinutes += computer.hours * 60;
      this.totalComputersMinutes += computer.minutes;
      return computer as CandiePurchase;
    });
    this.totalComputersHours = Math.floor(this.totalComputersMinutes / 60);
    this.totalComputersMinutes -= this.totalComputersHours * 60;
  }

  showCandiesPurchases(candiesPurchases) {
    this.candiesTotal = 0;
    this.allCandiesPurchases = candiesPurchases.map(candie => {
      this.candiesTotal += candie.price;
      candie.date = candie.date.toDate();
      return candie as CandiePurchase;
    });
  }

  showWorksRecords(worksRecords) {
    this.worksTotal = 0;
    this.allWorksRecords = worksRecords.map(work => {
      this.worksTotal += work.price;
      work.date = work.date.toDate();
      return work as WorkRecord;
    });
  }

  showArticlesPurchases(articlesPurchases) {
    this.articlesTotal = 0;
    this.allArticlesPurchases = articlesPurchases.map(article => {
      this.articlesTotal += article.price;
      article.date = article.date.toDate();
      return article as ArticlePurchase;
    });
  }

  showElectronicsPurchases(electronicsPurchases) {
    this.electronicsTotal = 0;
    this.allElectronicsPurchases = electronicsPurchases.map(electronic => {
      this.electronicsTotal += electronic.price;
      electronic.date = electronic.date.toDate();
      return electronic as ElectronicPurchase;
    });
  }

  toExcel(): void {
    this.exportableData.push({
      Nombre: 'XBOX 360',
      Vendidos: null,
      Precio: null,
      Stock: null,
      Tiempo: this.threeSixtyHours,
      Total: this.threeSixtyTotal,
      Ganancia: null
    });

    this.exportableData.push({
      Nombre: 'XBOX ONE',
      Vendidos: null,
      Precio: null,
      Stock: null,
      Tiempo: this.oneHours,
      Total: this.oneTotal,
      Ganancia: null
    });

    this.exportableData.push({
      Nombre: 'XBOX SERIES S',
      Vendidos: null,
      Precio: null,
      Stock: null,
      Tiempo: this.seriesHours,
      Total: this.seriesTotal,
      Ganancia: null
    });

    this.exportableData.push({
      Nombre: 'Computadoras',
      Vendidos: null,
      Precio: null,
      Stock: null,
      Tiempo: this.totalComputersHours,
      Total: this.computersTotal,
      Ganancia: null
    });

    this.exportableData.push({
      Nombre: 'Trabajos e impresiones'
    });

    this.allWorks.forEach(work => {
      this.exportableData.push(work);
    });

    this.exportableData.push({
      Nombre: 'Dulces'
    });

    this.allCandies.forEach(candie => {
      this.exportableData.push(candie);
    });

    this.exportableData.push({
      Nombre: 'Papelería'
    });

    this.allArticles.forEach(article => {
      this.exportableData.push(article);
    });

    this.exportableData.push({
      Nombre: 'Electrónicos'
    });

    this.allElectronics.forEach(electronic => {
      this.exportableData.push(electronic);
    });

    this.allWorksRecords.forEach(work => {
      let index = this.exportableData.findIndex(
        element => element['Nombre'] == work.name
      );
      if (index === -1) {
        let indexAnother = this.exportableData.findIndex(
          element => element['Nombre'].substring(0, 4) === 'Otro'
        );
        this.exportableData[indexAnother]['Vendidos'] += work.quantity;
        this.exportableData[indexAnother]['Total'] += work.price;
      } else {
        this.exportableData[index]['Vendidos'] += work.quantity;
        this.exportableData[index]['Total'] += work.price;
        this.exportableData[index]['Ganancia'] = null;
      }
    });

    let lastCandieIndex = 4;
    this.allCandiesPurchases.forEach(candie => {
      let index = this.exportableData.findIndex(
        element => element['Nombre'] == candie.candie.name
      );
      if (index !== -1) {
        lastCandieIndex = index + 1;
        this.exportableData[index]['Vendidos'] += candie.quantity;
        this.exportableData[index]['Total'] += candie.price;
        this.exportableData[index]['Ganancia'] += candie.profit;
      } else {
        const candieObject = {
          Nombre: candie.candie.name,
          Precio: candie.candie.price,
          Stock: 0,
          Tiempo: null,
          Total: candie.price,
          Vendidos: candie.quantity,
          Ganancia: candie.profit
        };
        this.exportableData.splice(lastCandieIndex, 0, candieObject);
      }
    });

    let lastElectronicIndex = 4;
    this.allElectronicsPurchases.forEach(electronic => {
      let index = this.exportableData.findIndex(
        element => element['Nombre'] == electronic.electronic.name
      );
      if (index !== -1) {
        lastElectronicIndex = index + 1;
        this.exportableData[index]['Vendidos'] += electronic.quantity;
        this.exportableData[index]['Total'] += electronic.price;
        this.exportableData[index]['Ganancia'] += electronic.profit;
      } else {
        const candiObject = {
          Nombre: electronic.electronic.name,
          Precio: electronic.electronic.price,
          Stock: 0,
          Tiempo: null,
          Total: electronic.price,
          Vendidos: electronic.quantity,
          Ganancia: electronic.profit
        };
        this.exportableData.splice(lastElectronicIndex, 0, candiObject);
      }
    });

    let lastArticleIndex = 4;
    this.allArticlesPurchases.forEach(article => {
      let index = this.exportableData.findIndex(
        element => element['Nombre'] == article.article.name
      );
      if (index !== -1) {
        lastArticleIndex = index + 1;
        this.exportableData[index]['Vendidos'] += article.quantity;
        this.exportableData[index]['Total'] += article.price;
        this.exportableData[index]['Ganancia'] += article.profit;
      } else {
        const candiObject = {
          Nombre: article.article.name,
          Precio: article.article.price,
          Stock: 0,
          Tiempo: null,
          Total: article.price,
          Vendidos: article.quantity,
          Ganancia: article.profit
        };
        this.exportableData.splice(lastElectronicIndex, 0, candiObject);
      }
    });

    this.initialService.exportAsExcelFile(this.exportableData, 'sample');
    this.exportableData = [];
  }
}
