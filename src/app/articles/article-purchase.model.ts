import { Article } from '../articles/article.model';

export class ArticlePurchase {
    article: Article;
    price: number;
    date: Date;
    quantity: number;
    paid: boolean;
}
