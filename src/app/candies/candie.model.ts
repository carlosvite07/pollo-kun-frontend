import { History } from "../history.model";

export class Candie {
    id: string;
    name: string;
    price: number;
    history: Array<History>;
}
