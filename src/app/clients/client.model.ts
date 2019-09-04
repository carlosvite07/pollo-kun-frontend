import { CandiePurchase } from '../candies/candie-purchase.model';
import { ComputerRecord } from '../computers/computer-record.model'
import { ConsoleRecord } from '../consoles/shared/console-record.model';
import { ArticlePurchase } from '../articles/article-purchase.model';
import { WorkRecord } from '../works/work-record.model';

export class Client {
    id: string;
    counter: number;
    startDate: Date;
    endDate: Date;
    finished: boolean;
    candiesPurchases: CandiePurchase[];
    computersRecords: ComputerRecord[];
    consolesRecords: ConsoleRecord[];
    articlesPurchases: ArticlePurchase[];
    worksRecords: WorkRecord[];
}
