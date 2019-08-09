import { Console } from './console';
import { Hour } from './hour';

export class Record{
    startDate: Date;
    endDate: Date;
    selectedConsole: Console; 
    selectedHour: Hour; 
    price: number;
}