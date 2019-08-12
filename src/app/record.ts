import { Console } from './console';
import { Hour } from './hour';

export class Record{
    id: number;
    startDate: Date;
    endDate: Date;
    selectedConsole: Console; 
    selectedHour: Hour; 
    idConsole: number;
    price: number;
}