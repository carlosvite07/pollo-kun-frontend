import { History } from "../history.model";

export class Article {
  id: string;
  name: string;
  price: number;
  history: Array<History>;
}
