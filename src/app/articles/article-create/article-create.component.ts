import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../article.model';
import { ArticlePurchase } from '../article-purchase.model';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {
  @Input() client;
  allArticles: Article[] = [];
  selectedArticle: Article;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorArticle: boolean = false;
  errorQuantity: boolean = false;
  stock: number = 0;
  successPurchase = false;

  constructor(
    private articlesService: ArticlesService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe(data => {
      this.allArticles = data.map(e => {
        const articlesResp = e.payload.doc.data() as Article;
        return {
          id: e.payload.doc.id,
          name: articlesResp.name,
          price: articlesResp.price,
          history: articlesResp.history
        } as Article;
      });
    });
  }

  onChangeSelection(): void {
    this.stock = 0;
    this.selectedPrice = this.selectedArticle.price;
    this.errorArticle = false;
    this.selectedArticle.history.forEach(
      element => (this.stock += element.stock)
    );
    this.errorQuantity =
      this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
  }

  onChangeQuantity(): void {
    this.errorQuantity =
      this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
  }

  articlePurchaseConfirm(): void {
    this.errorArticle = this.selectedArticle ? false : true;
    this.errorQuantity =
      this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
    if (this.errorArticle || this.errorQuantity) {
      return;
    }

    let quantityBuyed = this.selectedQuantity;
    let history = this.selectedArticle.history;

    if (!this.client.articlesPurchases) {
      this.client.articlesPurchases = [];
    }

    this.selectedArticle.history.forEach((element, index) => {
      if (element.stock < quantityBuyed) {
        if (element.stock !== 0 && quantityBuyed !== 0) {
          quantityBuyed -= element.stock;
          this.createPurchase(
            this.selectedPrice,
            element.unitary,
            element.stock,
            this.selectedArticle
          );
          history[index].stock = 0;
          this.articlesService.updateHistory(this.selectedArticle.id, history);
        }
      } else {
        if (quantityBuyed !== 0) {
          this.createPurchase(
            this.selectedPrice,
            element.unitary,
            quantityBuyed,
            this.selectedArticle
          );
          history[index].stock -= quantityBuyed;
          quantityBuyed = 0;
          this.articlesService.updateHistory(this.selectedArticle.id, history);
        }
      }
    });

    this.selectedArticle = undefined;
    this.selectedQuantity = 1;
  }

  createPurchase(
    articlePrice: number,
    unitary: number,
    quantityBuyed: number,
    article: Article
  ): void {
    const profit = (articlePrice - unitary) * quantityBuyed;
    const newPurchase = {
      date: new Date(),
      article: article,
      quantity: quantityBuyed,
      price: quantityBuyed * articlePrice,
      paid: false,
      profit: parseFloat(profit.toFixed(2)),
      unitary: unitary
    } as ArticlePurchase;
    this.client.articlesPurchases.unshift(newPurchase);
    this.clientsService.update(this.client);
  }
}
