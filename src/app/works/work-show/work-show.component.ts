import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { WorksService } from '../works.service';
import { Work } from '../work.model';

@Component({
  selector: 'app-work-show',
  templateUrl: './work-show.component.html',
  styleUrls: ['./work-show.component.scss']
})
export class WorkShowComponent {
  @Input() client;
  allWorks: Work[] = [];
  paid: boolean = false;

  constructor(
    private clientsService: ClientsService,
    private worksService: WorksService
  ) { }

  ngOnInit() {
    this.worksService.getWorks().subscribe(data => {
      this.allWorks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Work;
      });
    });
  }

  changeCheckValue(index: number) {
    this.client.worksRecords[index].paid = !this.client.worksRecords[index].paid;
    this.clientsService.update(this.client);
  }

  remove(index: number) {
    //TODO Restore sheets
    this.client.worksRecords.splice(index, 1);
    this.clientsService.update(this.client);
  }

}
