import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';


@Component({
  selector: 'app-clients-show',
  templateUrl: './clients-show.component.html',
  styleUrls: ['./clients-show.component.scss']
})
export class ClientsShowComponent implements OnInit {
  @Input() client;
  debt: number = 0;
  errorComputers: boolean = false;
  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.debt = 0;
    //Articles
    if (this.client.articlesPurchases && this.client.articlesPurchases.length > 0) {
      this.client.articlesPurchases.forEach(articlePurchase => {
        if (!articlePurchase.paid) {
          this.debt += articlePurchase.price;
        }
      });
    }
    //Consoles
    if (this.client.consolesRecords) {
      this.client.consolesRecords.forEach(consoleRecord => {
        if (!consoleRecord.paid) {
          this.debt += consoleRecord.price;
        }
      });
    }
    //Candies
    if (this.client.candiesPurchases && this.client.candiesPurchases.length > 0) {
      this.client.candiesPurchases.forEach(candiePurchase => {
        if (!candiePurchase.paid) {
          this.debt += candiePurchase.price;
        }
      });
    }
    //Computers
    if (this.client.computersRecords && this.client.computersRecords.length > 0) {
      this.client.computersRecords.forEach(computerRecord => {
        if (!computerRecord.paid && computerRecord.price) {
          this.debt += computerRecord.price;
        }
      });
    }
    //Works
    if (this.client.worksRecords) {
      this.client.worksRecords.forEach(workRecord => {
        if (!workRecord.paid) {
          this.debt += workRecord.price;
        }
      });
    }
  }

  endClient(): void {
    this.errorComputers = false;
    if (this.client.computersRecords && this.client.computersRecords.length > 0) {
      this.client.computersRecords.forEach(computerRecord => {
        if (!computerRecord.finished) {
          this.errorComputers = true;
        }
      });
    }
    if (!this.errorComputers) {
      this.clientsService.confirmEndClient(this.client, this.debt);
    }
  }

}
