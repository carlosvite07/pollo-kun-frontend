import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../articles/articles.service';
import { Article } from '../../articles/article.model';

@Component({
  selector: 'app-articles-prices',
  templateUrl: './articles-prices.component.html',
  styleUrls: ['./articles-prices.component.scss']
})
export class ArticlesPricesComponent implements OnInit {
  allArticles: Article[] = [];
  selectedArticle: Article;
  id: string;
  name: string = '';
  price: number = 0;
  stock: number = 0;
  errorName: boolean = false;
  errorPrice: boolean = false;
  errorStock: boolean = false;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe(data => {
      this.allArticles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Article;
      })
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedArticle.id;
    this.name = this.selectedArticle.name;
    this.price = this.selectedArticle.price;
    this.stock = this.selectedArticle.stock;
    this.validation();
  }

  clear(): void {
    this.selectedArticle = undefined;
    this.name = '';
    this.price = 0;
    this.stock = 0;
  }

  onChangeName(): void {
    this.errorName = this.name.length <= 0 ? true : false;
  }

  onChangePrice(): void {
    this.errorPrice = this.price <= 0 ? true : false;
  }

  onChangeStock(): void {
    this.errorStock = this.stock < 0 ? true : false;
  }

  create(): void {
    if(this.validation()){
      let newArticle = {
        name: this.name,
        price: this.price,
        stock: this.stock
      } as Article;
      this.articlesService.create(newArticle);
      this.clear();
    }
  }

  update(): void {
    if(this.validation()){
      this.selectedArticle.name = this.name;
      this.selectedArticle.price = this.price;
      this.selectedArticle.stock = this.stock;
      this.articlesService.update(this.selectedArticle);
      this.clear();
    }
  }

  delete(): void {
    this.articlesService.delete(this.selectedArticle);
    this.clear();
  }

  validation(): boolean{
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    this.errorStock = this.stock < 0 ? true : false;
    if (this.errorName || this.errorPrice || this.errorStock) {
      return false;
    }
    return true;
  }


}
