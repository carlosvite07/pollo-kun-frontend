import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-show',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.scss']
})
export class ArticleShowComponent {
  @Input() client;
  constructor() { }

}
