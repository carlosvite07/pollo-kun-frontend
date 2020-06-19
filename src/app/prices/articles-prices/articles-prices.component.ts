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
  history: Array<object> = [];
  stock: number = 0;
  unitary: number;
  errorName: boolean = false;
  errorPrice: boolean = false;
  errorStock: boolean = false;
  errorUnitary: boolean = false;
  errorHistory: Array<object> = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe(data => {
      this.allArticles = data.map(e => {
        const data = e.payload.doc.data() as Article;
        return {
          id: e.payload.doc.id,
          name: data.name,
          price: data.price,
          history: data.history
        } as Article;
      });
    });
  }

  onChangeSelection(): void {
    this.id = this.selectedArticle.id;
    this.name = this.selectedArticle.name;
    this.price = this.selectedArticle.price;
    this.history = this.selectedArticle.history;
    this.validation();
  }

  clear(): void {
    this.selectedArticle = undefined;
    this.name = '';
    this.price = 0;
    this.stock = 0;
    this.unitary = 0;
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

  onChangeUnitary(): void {
    this.errorUnitary = this.unitary <= 0 ? true : false;
  }

  addHistory() {
    this.selectedArticle.history.push({
      stock: 0,
      unitary: 0
    });
  }

  removeHistory(index) {
    this.selectedArticle.history.splice(index, 1);
  }

  create(): void {
    const history = {
      stock: this.stock,
      unitary: this.unitary
    };
    if (this.validation()) {
      let newArticle = {
        name: this.name,
        price: this.price,
        history: [history]
      } as Article;
      this.articlesService.create(newArticle);
      this.clear();
    }
  }

  update(): void {
    if (this.validation()) {
      this.selectedArticle.name = this.name;
      this.selectedArticle.price = this.price;
      this.articlesService.update(this.selectedArticle);
      this.clear();
    }
  }

  delete(): void {
    this.articlesService.delete(this.selectedArticle);
    this.clear();
  }

  validation(): boolean {
    this.errorName = this.name.length <= 0 ? true : false;
    this.errorPrice = this.price <= 0 ? true : false;
    if (this.errorName || this.errorPrice) {
      return false;
    }
    if (this.selectedArticle) {
      const errorArr = {
        stock: false,
        unitary: false
      };
      this.selectedArticle.history.forEach((element, index) => {
        errorArr.stock = element.stock < 0;
        errorArr.unitary = element.unitary <= 0;
        this.errorHistory[index] = errorArr;
        if (element.stock < 0 || element.unitary <= 0) {
          return false;
        }
      });
    } else {
      this.errorStock = this.stock < 0 ? true : false;
      this.errorUnitary = this.unitary <= 0 ? true : false;
      if (this.errorStock || this.errorUnitary) {
        return false;
      }
    }
    return true;
  }
}
