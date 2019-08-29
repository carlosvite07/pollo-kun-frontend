import { CandiePurchase } from '../candies/candie-purchase.model';
import { ConsoleRecord } from '../consoles/shared/console-record.model';
import { ArticlePurchase } from '../stationery/article-purchase.model';
import { WorkRecord } from '../works/work-record.model';

export class Client {
    id: string;
    counter: number;
    startDate: Date;
    endDate: Date;
    finished: boolean;
    candiesPurchases: CandiePurchase[];
    consolesRecords: ConsoleRecord[];
    articlesPurchases: ArticlePurchase[];
    worksRecords: WorkRecord[];
}
