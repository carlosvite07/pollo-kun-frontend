import { Console } from './console.model';
import { Notification } from '../../notifications/notification.model';

export class ConsoleRecord {
  id: string;
  startDate: Date;
  endDate: Date;
  console: Console;
  price: number;
  finished: boolean;
  hours: number;
  notification: Notification;
  paid: boolean;
  combo: boolean;
}
