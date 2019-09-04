import { Computer } from './computer.model';

export class ComputerRecord {
    id: string;
    startDate: Date;
    endDate: Date;
    computer: Computer;
    price: number;
    finished: boolean;
    hours: number;
    minutes: number;
    paid: boolean;
}
