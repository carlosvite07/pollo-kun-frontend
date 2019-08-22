import { Console } from './console.model';

export class Record{
    id: string;
    startDate: Date;
    endDate: Date;
    console: Console; 
    price: number;
    finished: boolean;
    hours: number;
}