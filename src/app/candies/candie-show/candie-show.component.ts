import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { CandiesService } from '../../candies/candies.service';
import { Candie } from '../candie.model';

@Component({
  selector: 'app-candie-show',
  templateUrl: './candie-show.component.html',
  styleUrls: ['./candie-show.component.scss']
})
export class CandieShowComponent implements OnInit {
  @Input() client;
  allCandies: Candie[] = [];
  paid: boolean = false;

  constructor(
    private clientsService: ClientsService,
    private candiesService: CandiesService
  ) { }

  ngOnInit() {
    this.candiesService.getAllCandies().subscribe(data => {
      this.allCandies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Candie;
      });
    });
  }

  changeCheckValue(index: number) {
    this.client.candiesPurchases[index].paid = !this.client.candiesPurchases[index].paid;
    this.clientsService.update(this.client);
  }

  remove(index: number) {
    let selectedCandie = this.client.candiesPurchases[index].candie;
    let quantity = this.client.candiesPurchases[index].quantity;
    
    this.allCandies.forEach(candie => {
      if (candie.id === selectedCandie.id) {
        this.candiesService.updateStock(candie.id, candie.stock + quantity);
      }
    });

    this.client.candiesPurchases.splice(index, 1);
    this.clientsService.update(this.client);
  }

}
