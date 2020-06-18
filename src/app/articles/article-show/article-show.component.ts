import { Component, OnInit, Input } from "@angular/core";
import { ClientsService } from "../../clients/clients.service";
import { Article } from "../article.model";
import { ArticlesService } from "../../articles/articles.service";

@Component({
  selector: "app-article-show",
  templateUrl: "./article-show.component.html",
  styleUrls: ["./article-show.component.scss"],
})
export class ArticleShowComponent implements OnInit {
  @Input() client;
  allArticles: Article[] = [];
  paid: boolean = false;

  constructor(
    private clientsService: ClientsService,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe((data) => {
      this.allArticles = data.map((e) => {
        const data = e.payload.doc.data as Article;
        return {
          id: e.payload.doc.id,
          name: data.name,
          price: data.price,
          history: data.history,
        } as Article;
      });
    });
  }

  changeCheckValue(index: number) {
    this.client.articlesPurchases[index].paid = !this.client.articlesPurchases[
      index
    ].paid;
    this.clientsService.update(this.client);
  }

  remove(index: number) {
    const selectedArticle = this.client.articlesPurchases[index].article;
    const quantity = this.client.articlesPurchases[index].quantity;

    const unitary = this.client.articlesPurchases[index].unitary;

    this.allArticles.forEach((article) => {
      if (article.id === selectedArticle.id) {
        let history = article.history;
        const updatedHistory = history.map((element) => {
          if (element.unitary === unitary) {
            return {
              stock: element.stock + quantity,
              unitary: unitary,
            };
          } else {
            return element;
          }
        });
        this.articlesService.updateHistory(article.id, updatedHistory);
      }
    });

    this.client.articlesPurchases.splice(index, 1);
    this.clientsService.update(this.client);
  }
}
