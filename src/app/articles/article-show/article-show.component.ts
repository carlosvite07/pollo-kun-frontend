import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { ArticlesService } from '../../articles/articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-show',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.scss']
})
export class ArticleShowComponent implements OnInit {
  @Input() client;
  allArticles: Article[] = [];
  paid: boolean = false;
  
  constructor(
    private clientsService: ClientsService,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe(data => {
      this.allArticles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Article;
      });
    });
  }

  changeCheckValue(index: number) {
    this.client.articlesPurchases[index].paid = !this.client.articlesPurchases[index].paid;
    this.clientsService.update(this.client);
  }

  remove(index: number) {
    let selectedArticle = this.client.articlesPurchases[index].article;
    let quantity = this.client.articlesPurchases[index].quantity;
    
    this.allArticles.forEach(article => {
      if (article.id === selectedArticle.id) {
        this.articlesService.updateStock(article.id, article.stock + quantity);
      }
    });

    this.client.articlesPurchases.splice(index, 1);
    this.clientsService.update(this.client);
  }
}
