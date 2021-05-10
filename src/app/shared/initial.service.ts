import { Injectable } from '@angular/core';
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
  constructor() {}
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
    toDate: NgbDate,
    isHoursReport: boolean = false
  ): void {
    let workbook: XLSX.WorkBook;
    if (isHoursReport) {
      const hours: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.hours);
      workbook = {
        Sheets: {
          'Reporte de horas': hours
        },
        SheetNames: ['Reporte de horas']
      };
    } else {
      const xboxsComputers: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
        json.xboxsComputers
      );
      const works: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.works);
      const candies: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.candie);
      const stationery: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.article);
      const electronics: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
        json.electronic
      );
      workbook = {
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
    }
    const fileName = isHoursReport ? 'Reporte de horas' : 'Ganancias';
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, fileName, fromDate, toDate);
  }

  private saveAsExcelFile(
    buffer: any,
    fileName: String,
    fromDate: NgbDate,
    toDate: NgbDate = null
  ): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      this.getFileName(fileName, fromDate, toDate) + EXCEL_EXTENSION
    );
  }

  private getFileName(
    fileName: String,
    fromDate: NgbDate,
    toDate: NgbDate = null
  ): String {
    if (toDate === null) {
      const monthName = this.monthNames[fromDate.month - 1];
      return `${fileName} ${fromDate.day} de ${monthName} del ${fromDate.year}`;
    }
    if (fromDate.day !== toDate.day) {
      const firstMonthName = this.monthNames[fromDate.month - 1];
      const secondMonthName = this.monthNames[toDate.month - 1];
      if (firstMonthName === secondMonthName) {
        return `${fileName} del ${fromDate.day} al ${toDate.day} de ${firstMonthName} del ${fromDate.year}`;
      } else {
        if (fromDate.year === toDate.year) {
          return `${fileName} del ${fromDate.day} de ${firstMonthName} al ${toDate.day} de ${secondMonthName} del ${fromDate.year}`;
        } else {
          return `${fileName} del ${fromDate.day} de ${firstMonthName} del ${fromDate.year} al ${toDate.day} de ${secondMonthName} del ${toDate.year}`;
        }
      }
    } else {
      const monthName = this.monthNames[fromDate.month - 1];
      return `${fileName} ${fromDate.day} de ${monthName} del ${fromDate.year}`;
    }
  }
}
