import { Candie } from '../candies/candie.model';

export class CandiePurchase {
    id: string;
    candie: Candie;
    price: number;
    date: Date;
    quantity: number;
    paid: boolean;
    profit: number;
    unitary: number;
}
