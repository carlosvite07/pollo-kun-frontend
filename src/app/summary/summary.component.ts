import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from './summary.service';
import { ConsoleRecord } from '../consoles/shared/console-record.model';
import { WorkRecord } from '../works/work-record.model';
import { CandiePurchase } from '../candies/candie-purchase.model';
import { ArticlePurchase } from '../articles/article-purchase.model';
import { ElectronicPurchase } from '../electronics/electronic-purchase.model';
import { Client } from '../clients/client.model';
import { InitialService } from '../shared/initial.service';
import { WorksService } from '../works/works.service';
import { CandiesService } from '../candies/candies.service';
import { ArticlesService } from '../articles/articles.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { ComputerRecord } from '../computers/computer-record.model';

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
  // threeSixtyRecords: ConsoleRecord[] = [];
  // threeSixtyTotal: number = 0;
  // threeSixtyHours: number = 0;

  allComputers: ComputerRecord[] = [];
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
  exportableData = {
    xboxsComputers: [],
    works: [],
    candie: [],
    article: [],
    electronic: []
  };
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
    const start = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day,
      0,
      0
    );
    const end = new Date(
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
          Vendidos: null,
          Total: null
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
          Unitario: e.payload.doc.data()['history'][0].unitary,
          Stock: stock,
          Vendidos: null,
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
          Unitario: e.payload.doc.data()['history'][0].unitary,
          Stock: stock,
          Vendidos: null,
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
          Unitario: e.payload.doc.data()['history'][0].unitary,
          Stock: stock,
          Vendidos: null,
          Total: null,
          Ganancia: null
        };
      });
    });
  }

  onDateSelection(date: NgbDate) {
    let start: Date;
    let end: Date;

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

      this.showConsolesRecords(consolesRecords);
      this.showComputersRecords(computersRecords);
      this.showWorksRecords(worksRecords);
      this.showCandiesPurchases(candiesPurchases);
      this.showArticlesPurchases(articlesPurchases);
      this.showElectronicsPurchases(electronicsPurchases);
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
    // this.threeSixtyRecords = [];
    // this.threeSixtyTotal = 0;
    // this.threeSixtyHours = 0;
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
      // if (record.console.type === '360') {
      // this.threeSixtyRecords.push(record as ConsoleRecord);
      // this.threeSixtyTotal += record.price;
      // this.threeSixtyHours += record.hours;
      // }
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
      return computer as ComputerRecord;
    });
    this.totalComputersHours = Math.floor(this.totalComputersMinutes / 60);
    this.totalComputersMinutes -= this.totalComputersHours * 60;
  }

  showCandiesPurchases(candiesPurchases) {
    this.candiesTotal = 0;
    this.allCandiesPurchases = candiesPurchases.map(candie => {
      this.candiesTotal += candie.price;
      const candieDate = candie.date.toDate();
      candie.date = candieDate;
      return candie as CandiePurchase;
    });
  }

  showWorksRecords(worksRecords) {
    this.worksTotal = 0;
    this.allWorksRecords = worksRecords.map(work => {
      this.worksTotal += work.price;
      const workDate = work.date.toDate();
      work.date = workDate;
      return work as WorkRecord;
    });
  }

  showArticlesPurchases(articlesPurchases) {
    this.articlesTotal = 0;
    this.allArticlesPurchases = articlesPurchases.map(article => {
      this.articlesTotal += article.price;
      const articleDate = article.date.toDate();
      article.date = articleDate;
      return article as ArticlePurchase;
    });
  }

  showElectronicsPurchases(electronicsPurchases) {
    this.electronicsTotal = 0;
    this.allElectronicsPurchases = electronicsPurchases.map(electronic => {
      this.electronicsTotal += electronic.price;
      const electronicDate = electronic.date.toDate();
      electronic.date = electronicDate;
      return electronic as ElectronicPurchase;
    });
  }

  private addToWorkingHours = (
    hourObject: any,
    price: number,
    startDate: Date,
    endDate: Date = null
  ) => {
    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const dayOfTheWeek = startDate.getDay();
    if (endDate === null || endDate === undefined) {
      this.switchDay(dayOfTheWeek, startHour, hourObject, price);
    } else {
      const endHour = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      if (startHour === endHour) {
        this.switchDay(dayOfTheWeek, startHour, hourObject, price);
      } else {
        const diffMs = endDate.getTime() - startDate.getTime();
        const totalMinutes = Math.round(diffMs / 60 / 1000);

        this.switchDay(
          dayOfTheWeek,
          startHour,
          hourObject,
          this.getProporcionalProfit(price, 60 - startMinutes, totalMinutes)
        );
        for (let index = 0; index < endHour - 1 - startHour; index++) {
          this.switchDay(
            dayOfTheWeek,
            startHour + index + 1,
            hourObject,
            this.getProporcionalProfit(price, 60, totalMinutes)
          );
        }
        this.switchDay(
          dayOfTheWeek,
          endHour,
          hourObject,
          this.getProporcionalProfit(price, endMinutes, totalMinutes)
        );
      }
    }
  };

  private getProporcionalProfit = (
    price,
    minutes: number,
    totalMinutes: number
  ) => {
    const proporcional = (minutes * 100) / totalMinutes;
    return proporcional * 0.01 * price;
  };

  private switchDay = (
    day: number,
    hour: number,
    hoursObject: any,
    minutes: number
  ) => {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ];

    switch (days[day]) {
      case 'Domingo':
        this.switchHour('Domingo', hour, hoursObject, minutes);
        break;
      case 'Lunes':
        this.switchHour('Lunes', hour, hoursObject, minutes);
        break;
      case 'Martes':
        this.switchHour('Martes', hour, hoursObject, minutes);
        break;
      case 'Miércoles':
        this.switchHour('Miércoles', hour, hoursObject, minutes);
        break;
      case 'Jueves':
        this.switchHour('Jueves', hour, hoursObject, minutes);
        break;
      case 'Viernes':
        this.switchHour('Viernes', hour, hoursObject, minutes);
        break;
      case 'Sábado':
        this.switchHour('Sábado', hour, hoursObject, minutes);
        break;

      default:
        break;
    }
  };

  private switchHour = (
    day: string,
    hour: number,
    hoursObject: any,
    minutes: number
  ) => {
    switch (hour) {
      case 7:
        hoursObject['7:00 - 8:00'][day] += minutes;
        break;
      case 8:
        hoursObject['8:00 - 9:00'][day] += minutes;
        break;
      case 9:
        hoursObject['9:00 - 10:00'][day] += minutes;
        break;
      case 10:
        hoursObject['10:00 - 11:00'][day] += minutes;
        break;
      case 11:
        hoursObject['11:00 - 12:00'][day] += minutes;
        break;
      case 12:
        hoursObject['12:00 - 13:00'][day] += minutes;
        break;
      case 13:
        hoursObject['13:00 - 14:00'][day] += minutes;
        break;
      case 14:
        hoursObject['14:00 - 15:00'][day] += minutes;
        break;
      case 15:
        hoursObject['15:00 - 16:00'][day] += minutes;
        break;
      case 16:
        hoursObject['16:00 - 17:00'][day] += minutes;
        break;
      case 17:
        hoursObject['17:00 - 18:00'][day] += minutes;
        break;
      case 18:
        hoursObject['18:00 - 19:00'][day] += minutes;
        break;
      case 19:
        hoursObject['19:00 - 20:00'][day] += minutes;
        break;
      case 20:
        hoursObject['20:00 - 21:00'][day] += minutes;
        break;
      case 21:
        hoursObject['21:00 - 22:00'][day] += minutes;
        break;

      default:
        break;
    }
  };

  toExcel(isHoursReport: boolean = false): void {
    if (isHoursReport) {
      const workingHours = {
        '7:00 - 8:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '8:00 - 9:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '9:00 - 10:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '10:00 - 11:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '11:00 - 12:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '12:00 - 13:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '13:00 - 14:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '14:00 - 15:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '15:00 - 16:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '16:00 - 17:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '17:00 - 18:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '18:00 - 19:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '19:00 - 20:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '20:00 - 21:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        },
        '21:00 - 22:00': {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0
        }
      };

      this.oneRecords.forEach(record =>
        this.addToWorkingHours(
          workingHours,
          record.price,
          record.startDate,
          record.endDate
        )
      );
      this.seriesRecords.forEach(record =>
        this.addToWorkingHours(
          workingHours,
          record.price,
          record.startDate,
          record.endDate
        )
      );
      this.allComputers.forEach(record =>
        this.addToWorkingHours(
          workingHours,
          record.price,
          record.startDate,
          record.endDate
        )
      );
      this.allWorksRecords.forEach(record =>
        this.addToWorkingHours(workingHours, record.price, record.date)
      );
      this.allCandiesPurchases.forEach(record =>
        this.addToWorkingHours(workingHours, record.price, record.date)
      );
      this.allArticlesPurchases.forEach(record =>
        this.addToWorkingHours(workingHours, record.price, record.date)
      );
      this.allElectronicsPurchases.forEach(record =>
        this.addToWorkingHours(workingHours, record.price, record.date)
      );

      const exportableHours = {
        hours: []
      };
      for (const property in workingHours) {
        exportableHours.hours.push({
          Hora: property,
          Lunes: workingHours[property]['Lunes'],
          Martes: workingHours[property]['Martes'],
          Miércoles: workingHours[property]['Miércoles'],
          Jueves: workingHours[property]['Jueves'],
          Viernes: workingHours[property]['Viernes'],
          Sábado: workingHours[property]['Sábado'],
          Domingo: workingHours[property]['Domingo']
        });
      }
      this.initialService.exportAsExcelFile(
        exportableHours,
        this.fromDate,
        this.toDate,
        true
      );
    } else {
      // this.exportableData.push({
      //   Nombre: 'XBOX 360',
      //   Vendidos: null,
      //   Precio: null,
      //   Stock: null,
      //   Tiempo: this.threeSixtyHours,
      //   Total: this.threeSixtyTotal,
      //   Ganancia: null
      // });

      this.exportableData.xboxsComputers.push({
        Nombre: 'XBOX ONE',
        Tiempo: this.oneHours,
        Total: this.oneTotal
      });

      this.exportableData.xboxsComputers.push({
        Nombre: 'XBOX SERIES S',
        Tiempo: this.seriesHours,
        Total: this.seriesTotal
      });

      this.exportableData.xboxsComputers.push({
        Nombre: 'Computadoras',
        Tiempo: this.totalComputersHours,
        Total: this.computersTotal
      });

      this.exportableData.xboxsComputers.push({
        Nombre: null,
        Tiempo: null,
        Total: null
      });

      this.exportableData.xboxsComputers.push({
        Nombre: null,
        Tiempo: 'TOTAL',
        Total: this.oneTotal + this.seriesTotal + this.computersTotal
      });

      this.allWorks.forEach(work => {
        this.exportableData.works.push(work);
      });

      this.allCandies.forEach(candie => {
        this.exportableData.candie.push(candie);
      });

      this.allArticles.forEach(article => {
        this.exportableData.article.push(article);
      });

      this.allElectronics.forEach(electronic => {
        this.exportableData.electronic.push(electronic);
      });

      let totalWorks = 0;
      this.allWorksRecords.forEach(work => {
        let index = this.exportableData.works.findIndex(
          element => element['Nombre'] == work.name
        );
        if (index === -1) {
          let indexAnother = this.exportableData.works.findIndex(
            element => element['Nombre'].substring(0, 4) === 'Otro'
          );
          this.exportableData.works[indexAnother]['Vendidos'] += work.quantity;
          this.exportableData.works[indexAnother]['Total'] += work.price;
          totalWorks += work.price;
        } else {
          this.exportableData.works[index]['Vendidos'] += work.quantity;
          this.exportableData.works[index]['Total'] += work.price;
          totalWorks += work.price;
        }
      });

      this.exportableData.works.push({
        Nombre: null,
        Precio: null,
        Vendidos: null,
        Total: null
      });

      this.exportableData.works.push({
        Nombre: null,
        Precio: null,
        Vendidos: 'TOTAL',
        Total: totalWorks
      });

      this.buildExportExcelObject(this.allCandiesPurchases, 'candie');
      this.buildExportExcelObject(this.allArticlesPurchases, 'article');
      this.buildExportExcelObject(this.allElectronicsPurchases, 'electronic');

      this.initialService.exportAsExcelFile(
        this.exportableData,
        this.fromDate,
        this.toDate,
        false
      );
      this.exportableData = {
        xboxsComputers: [],
        works: [],
        candie: [],
        article: [],
        electronic: []
      };
    }
  }

  private buildExportExcelObject = (purchases, keyName: string) => {
    let lastIndex = 4;
    let totalMoney = 0;
    let totalProfit = 0;
    purchases.forEach(purchase => {
      let index = this.exportableData[keyName].findIndex(
        element => element['Nombre'] == purchase[keyName].name
      );
      if (index !== -1) {
        lastIndex = index + 1;
        this.exportableData[keyName][index]['Vendidos'] += purchase.quantity;
        this.exportableData[keyName][index]['Total'] += purchase.price;
        this.exportableData[keyName][index]['Ganancia'] += purchase.profit;
        totalMoney += purchase.price;
        totalProfit += purchase.profit;
      } else {
        const exportObject = {
          Nombre: purchase[keyName].name,
          Precio: purchase[keyName].price,
          Unitario: purchase[keyName].history[0].unitary,
          Stock: null,
          Total: purchase.price,
          Vendidos: purchase.quantity,
          Ganancia: purchase.profit
        };
        totalMoney += purchase.price;
        totalProfit += purchase.profit;
        this.exportableData[keyName].splice(lastIndex, 0, exportObject);
      }
    });
    this.exportableData[keyName].push({
      Nombre: null,
      Precio: null,
      Unitario: null,
      Stock: null,
      Vendidos: null,
      Total: null,
      Ganancia: null
    });
    this.exportableData[keyName].push({
      Nombre: null,
      Precio: null,
      Unitario: null,
      Stock: null,
      Vendidos: 'TOTAL',
      Total: totalMoney,
      Ganancia: totalProfit
    });
  };
}
