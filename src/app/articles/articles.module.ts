import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleShowComponent } from './article-show/article-show.component';

@NgModule({
  declarations: [ArticleCreateComponent, ArticleShowComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [ArticleCreateComponent, ArticleShowComponent]
})
export class ArticlesModule {}
