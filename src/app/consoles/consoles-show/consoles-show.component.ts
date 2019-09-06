import { Component, OnChanges, Input } from '@angular/core';
import { ConsolesService } from '../shared/consoles.service';
import { Client } from 'src/app/clients/client.model';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-consoles-show',
  templateUrl: './consoles-show.component.html',
  styleUrls: ['./consoles-show.component.scss']
})
export class ConsolesShowComponent implements OnChanges {
  @Input() client: Client;
  isWarningLessTime = false;

  constructor(
    private consolesService: ConsolesService,
    private clientsService:ClientsService
  ) { }

  ngOnChanges() {
  }

  end(index: number): void {
    this.consolesService.confirmEndConsoleRecod(this.client, index);
  }

  change(index: number): void {
    this.consolesService.confirmChangeConsoleRecord(this.client, index);
  }

  addTime(index: number): void {
    this.consolesService.confirmAddTimeConsoleRecord(this.client, index);
  }

  lessTime(index: number): void {
    if(this.client.consolesRecords[index].hours < 1){
      this.warningLessTime();
      return;
    }
    this.consolesService.confirmLessTimeConsoleRecord(this.client, index);
  }

  changeCheckValue(index: number) {
    this.client.consolesRecords[index].paid = !this.client.consolesRecords[index].paid;
    this.clientsService.update(this.client);
  }

  warningLessTime(){
    this.isWarningLessTime = true;
    setTimeout(() => { this.isWarningLessTime = false }, 3000);
  }

}
