import { Component, OnChanges, Input } from '@angular/core';
import { ConsolesService } from '../shared/consoles.service';
import { Client } from 'src/app/clients/client.model';

@Component({
  selector: 'app-consoles-show',
  templateUrl: './consoles-show.component.html',
  styleUrls: ['./consoles-show.component.scss']
})
export class ConsolesShowComponent implements OnChanges {
  @Input() client: Client;


  constructor(private consolesService: ConsolesService) {}

  ngOnChanges() {
  }

  end(index: number): void {
    this.consolesService.confirmEndConsoleRecod(this.client,index);
  }

  addTime(index:number): void{
    this.consolesService.confirmAddTimeConsoleRecord(this.client,index);
  }

}
