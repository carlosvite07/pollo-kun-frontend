import { Component, OnInit } from '@angular/core';
import { WorksService } from '../../works/works.service';
import { Work } from '../../works/work.model';

@Component({
  selector: 'app-works-prices',
  templateUrl: './works-prices.component.html',
  styleUrls: ['./works-prices.component.scss']
})
export class WorksPricesComponent implements OnInit {
  allWorks: Work[] = [];
  selectedWork: Work;
  id: string;
  name: string = '';
  price: number = 0;
  errorName: boolean = false;
  errorPrice: boolean = false;

  constructor(private worksService: WorksService) {}

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
    this.id = this.selectedWork.id;
    this.name = this.selectedWork.name;
    this.price = this.selectedWork.price;
    this.validation();
  }

  clear(): void {
    this.selectedWork = undefined;
    this.name = '';
    this.price = 0;
  }

  onChangeName(): void {
    this.errorName = this.name.length <= 0 ? true : false;
  }

  onChangePrice(): void {
    this.errorPrice = this.price <= 0 ? true : false;
  }

  create(): void {
    if (this.validation()) {
      let newWork = {
        name: this.name,
        price: this.price
      } as Work;
      this.worksService.create(newWork);
      this.clear();
    }
  }

  update(): void {
    if (this.validation()) {
      this.selectedWork.name = this.name;
      this.selectedWork.price = this.price;
      this.worksService.update(this.selectedWork);
      this.clear();
    }
  }

  delete(): void {
    this.worksService.delete(this.selectedWork);
    this.clear();
  }

  validation(): boolean {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    if (this.errorName || this.errorPrice) {
      return false;
    }
    return true;
  }
}
