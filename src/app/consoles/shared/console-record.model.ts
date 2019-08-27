import { Console } from './console.model';

export class ConsoleRecord{
    id: string;
    startDate: Date;
    endDate: Date;
    console: Console; 
    price: number;
    finished: boolean;
    hours: number;
}