import { Component, OnInit } from '@angular/core';
import { StationeryService } from './stationery.service';
import { Article } from './article.model';
import { ArticlePurchase } from './article-purchase.model';

@Component({
  selector: 'app-stationery',
  templateUrl: './stationery.component.html',
  styleUrls: ['./stationery.component.scss']
})
export class StationeryComponent implements OnInit {
  allArticles: Article[] = [];
  selectedArticle: Article;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorArticle: boolean = false;
  errorQuantity: boolean = false;
  successPurchase = false;

  constructor(private stationeryService: StationeryService) { }

  ngOnInit() {
    this.stationeryService.getArticles().subscribe(data => {
      this.allArticles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Article;
      });
    });
  }

  onChangeSelection(): void {
    this.selectedPrice = this.selectedArticle.price;
    this.errorArticle = false;
  }

  onChangeQuantity(): void {
    this.errorQuantity = (this.selectedQuantity <= 0) ? true : false;
  }

  articlePurchaseConfirm(): void {
    this.errorArticle = (this.selectedArticle) ? false : true;
    this.errorQuantity = (this.selectedQuantity <= 0) ? true : false;
    if (this.errorArticle || this.errorQuantity) {
      return;
    }
    let newPurchase = {
      date: new Date(),
      name: this.selectedArticle.name,
      quantity: this.selectedQuantity,
      price: this.selectedQuantity * this.selectedPrice
    } as ArticlePurchase;
    this.stationeryService.articlePurchase(newPurchase);
    this.selectedArticle = undefined;
    this.selectedQuantity = 1;
    this.showSuccesPurchase();
  }

  showSuccesPurchase() {
    this.successPurchase = true;
    setTimeout(() => {
      this.successPurchase = false;
    }, 3000)
  }

}
