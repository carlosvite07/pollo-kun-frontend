import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Computer } from './computer.model';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/client.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {
  private computerRecordEnd = new Subject<any>();
  computerRecordEnd$ = this.computerRecordEnd.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private clientService: ClientsService
  ) { }

  //CRUD Computers
  create(computerModel: Computer): any {
    return this.firestore.collection('computers').add(computerModel);
  }

  getComputers(): any {
    return this.firestore.collection('computers', ref => ref.where('available', '==', true).orderBy('name')).snapshotChanges();
  }

  update(computer: Computer) {
    let computerId = computer.id;
    this.firestore.doc(`computers/${computerId}`).update(computer);
  }

  updateUnavailable(computerId: string) {
    this.firestore.doc(`computers/${computerId}`).update({ available: false });
  }

  updateAvailable(computerId: string) {
    this.firestore.doc(`computers/${computerId}`).update({ available: true });
  }

  delete(computerModel: Computer) {
    this.firestore.collection('computers').doc(computerModel.id).delete();
  }

  //Computer Records CRUD
  createRecord(computerId: string, clientModel: Client): any {
    this.updateUnavailable(computerId);
    return this.clientService.update(clientModel);
  }

  //Computer Modal
  confirmEndComputerRecod(client: Client, computerIndex: number) {
    let object = {
      client: client,
      computerIndex: computerIndex
    };
    this.computerRecordEnd.next(object);
  }

  endComputerRecord(client: Client, computerIndex: number) {
    let now = new Date();
    client.computersRecords[computerIndex].finished = true;
    client.computersRecords[computerIndex].endDate = now;
    client.computersRecords[computerIndex].price =
      this.getComputerRecordPrice(client.computersRecords[computerIndex].startDate, now, client.computersRecords[computerIndex].computer);
    let minutesAndHours = this.getMinutesAndHours(client.computersRecords[computerIndex].startDate, now);
    client.computersRecords[computerIndex].hours = minutesAndHours.hours;
    client.computersRecords[computerIndex].minutes = minutesAndHours.minutes;
    let computerId = client.computersRecords[computerIndex].computer.id;
    this.updateAvailable(computerId);
    this.clientService.update(client);
  }

  //Utility
  getComputerRecordPrice(start: Date, end: Date, computer: Computer): number {
    let minutesAndHours = this.getMinutesAndHours(start, end);
    let total: number = 0;
    let hourPrice = computer.hourPrice;
    let halfHourPrice = computer.halfHourPrice;
    let fiveMinutesPrice = computer.fiveMinutesPrice;

    if (minutesAndHours.minutes != 0) {
      if (minutesAndHours.minutes <= 5) {
        total += fiveMinutesPrice;
      }
      else if (minutesAndHours.minutes <= 30) {
        total += halfHourPrice;
      }
      else {
        total += hourPrice;
      }
    }
    if (minutesAndHours.hours >= 1) {
      total += minutesAndHours.hours * hourPrice;
    }
    if (total === 0) {
      total = 3;
    }
    return total;
  }

  getMinutesAndHours(start: Date, end: Date) {
    let difference: number = (end.getTime() - start.getTime()) / (60 * 60 * 1000);
    let hours: number = Math.floor(difference);
    let minutes: number = difference - hours;
    return {
      minutes: Math.floor(minutes * 60),
      hours: hours
    };
  }

  endAllComputersRecords(client: Client) {
    let now = new Date();
    let count = 0;
    client.computersRecords.forEach((computerRecord, index) => {
      if(!client.computersRecords[index].finished){
        count++;
        client.computersRecords[index].finished = true;
        client.computersRecords[index].endDate = now;
        client.computersRecords[index].price =
          this.getComputerRecordPrice(client.computersRecords[index].startDate, now, client.computersRecords[index].computer);
        let minutesAndHours = this.getMinutesAndHours(client.computersRecords[index].startDate, now);
        client.computersRecords[index].hours = minutesAndHours.hours;
        client.computersRecords[index].minutes = minutesAndHours.minutes;
        let computerId = client.computersRecords[index].computer.id;
        this.updateAvailable(computerId);
      }
    });
    if(count > 0){
      this.clientService.update(client);
    }
  }


}
