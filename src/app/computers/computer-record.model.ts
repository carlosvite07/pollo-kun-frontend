import { Computer } from './computer.model';
import { Notification } from '../notifications/notification.model';

export class ComputerRecord {
  id: string;
  startDate: Date;
  endDate: Date;
  computer: Computer;
  price: number;
  finished: boolean;
  hours: number;
  minutes: number;
  notification: Notification;
  paid: boolean;
}
