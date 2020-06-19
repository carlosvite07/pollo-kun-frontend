import { Component, OnInit, Input } from '@angular/core';
import { ComputersService } from '../computers.service';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-computer-show',
  templateUrl: './computer-show.component.html',
  styleUrls: ['./computer-show.component.scss']
})
export class ComputerShowComponent implements OnInit {
  @Input() client;

  constructor(
    private computersService: ComputersService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {}

  end(index: number): void {
    this.computersService.confirmEndComputerRecod(this.client, index);
  }

  changeCheckValue(index: number) {
    this.client.computersRecords[index].paid = !this.client.computersRecords[
      index
    ].paid;
    this.clientsService.update(this.client);
  }
}
