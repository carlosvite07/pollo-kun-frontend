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

  constructor(
    private articlesService: ArticlesService,
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.articlesService.getArticles().subscribe(data => {
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
    this.errorQuantity = this.selectedQuantity <= 0 || this.selectedArticle.stock < this.selectedQuantity;
  }

  articlePurchase(): void {
    this.errorArticle = (this.selectedArticle) ? false : true;
    this.errorQuantity = this.selectedQuantity <= 0 || this.selectedArticle.stock < this.selectedQuantity;
    if (this.errorArticle || this.errorQuantity) {
      return;
    }
    let newPurchase = {
      article: this.selectedArticle,
      date: new Date(),
      name: this.selectedArticle.name,
      quantity: this.selectedQuantity,
      price: this.selectedQuantity * this.selectedPrice,
      paid: false
    } as ArticlePurchase;
    if (!this.client.articlesPurchases) {
      this.client.articlesPurchases = [];
    }
    this.client.articlesPurchases.unshift(newPurchase);
    this.clientsService.update(this.client);
    this.articlesService.updateStock(this.selectedArticle.id,this.selectedArticle.stock-this.selectedQuantity);
    this.selectedArticle = undefined;
    this.selectedPrice = undefined;
    this.selectedQuantity = 1;
  }

}
