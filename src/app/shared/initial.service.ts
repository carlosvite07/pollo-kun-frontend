import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class InitialService {
  constructor(private firestore: AngularFirestore) {}
  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  public exportAsExcelFile(
    json: any,
    fromDate: NgbDate,
    toDate: NgbDate
  ): void {
    const xboxsComputers: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      json.xboxsComputers
    );
    const works: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.works);
    const candies: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.candie);
    const stationery: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.article);
    const electronics: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      json.electronic
    );
    const workbook: XLSX.WorkBook = {
      Sheets: {
        'Xboxs y Computadoras': xboxsComputers,
        Trabajos: works,
        Dulces: candies,
        Papelería: stationery,
        Electrónicos: electronics
      },
      SheetNames: [
        'Xboxs y Computadoras',
        'Trabajos',
        'Dulces',
        'Papelería',
        'Electrónicos'
      ]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, fromDate, toDate);
  }

  private saveAsExcelFile(
    buffer: any,
    fromDate: NgbDate,
    toDate: NgbDate
  ): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      this.getFileName(fromDate, toDate) + EXCEL_EXTENSION
    );
  }

  private getFileName(fromDate: NgbDate, toDate: NgbDate): String {
    if (fromDate.day !== toDate.day) {
      const firstMonthName = this.monthNames[fromDate.month - 1];
      const secondMonthName = this.monthNames[toDate.month - 1];
      if (firstMonthName === secondMonthName) {
        return `del ${fromDate.day} al ${toDate.day} de ${firstMonthName} del ${fromDate.year}`;
      } else {
        if (fromDate.year === toDate.year) {
          return `del ${fromDate.day} de ${firstMonthName} al ${toDate.day} de ${secondMonthName} del ${fromDate.year}`;
        } else {
          return `del ${fromDate.day} de ${firstMonthName} del ${fromDate.year} al ${toDate.day} de ${secondMonthName} del ${toDate.year}`;
        }
      }
    } else {
      const monthName = this.monthNames[fromDate.month - 1];
      return `${fromDate.day} de ${monthName} del ${fromDate.year}`;
    }
  }
}
