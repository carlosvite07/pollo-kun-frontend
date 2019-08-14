import { Console } from './console.model';

export class Record{
    id: number;
    startDate: Date;
    endDate: Date;
    console: Console; 
    price: number;
    finished: boolean;
}