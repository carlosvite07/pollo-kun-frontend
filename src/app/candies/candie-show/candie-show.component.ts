import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { CandiesService } from '../candies.service';
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
        const data = e.payload.doc.data() as Candie;
        return {
          id: e.payload.doc.id,
          name: data.name,
          price: data.price,
          history: data.history
        } as Candie;
      });
    });
  }

  changeCheckValue(index: number) {
    this.client.candiesPurchases[index].paid = !this.client.candiesPurchases[index].paid;
    this.clientsService.update(this.client);
  }

  remove(index: number) {
    const selectedCandie = this.client.candiesPurchases[index].candie;
    const quantity = this.client.candiesPurchases[index].quantity;

    const unitary = this.client.candiesPurchases[index].unitary;
    
    this.allCandies.forEach(candie => {
      if (candie.id === selectedCandie.id) {
        let history = candie.history;
        const updatedHistory = history.map(element => {
          if(element.unitary === unitary){
            return {
              stock: element.stock + quantity,
              unitary: unitary
            }
          }else{
            return element
          }
        });
        this.candiesService.updateHistory(candie.id,updatedHistory);
      }
    });

    this.client.candiesPurchases.splice(index, 1);
    this.clientsService.update(this.client);
  }

}
