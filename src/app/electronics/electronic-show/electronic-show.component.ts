import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '../../clients/clients.service';
import { Electronic } from '../electronic.model';
import { ElectronicsService } from '../electronics.service';

@Component({
  selector: 'app-electronic-show',
  templateUrl: './electronic-show.component.html',
  styleUrls: ['./electronic-show.component.scss']
})
export class ElectronicShowComponent implements OnInit {
  @Input() client;
  allElectronics: Electronic[] = [];
  paid: boolean = false;

  constructor(
    private clientsService: ClientsService,
    private electronicsService: ElectronicsService
  ) {}

  ngOnInit() {
    this.electronicsService.getAllElectronics().subscribe(data => {
      this.allElectronics = data.map(e => {
        const data = e.payload.doc.data() as Electronic;
        return {
          id: e.payload.doc.id,
          name: data.name,
          price: data.price,
          history: data.history
        } as Electronic;
      });
    });
  }

  changeCheckValue(index: number) {
    this.client.electronicsPurchases[index].paid = !this.client
      .electronicsPurchases[index].paid;
    this.clientsService.update(this.client);
  }

  remove(index: number) {
    const selectedElectronic = this.client.electronicsPurchases[index]
      .electronic;
    const quantity = this.client.electronicsPurchases[index].quantity;

    const unitary = this.client.electronicsPurchases[index].unitary;

    this.allElectronics.forEach(electronic => {
      if (electronic.id === selectedElectronic.id) {
        let history = electronic.history;
        const updatedHistory = history.map(element => {
          if (element.unitary === unitary) {
            return {
              stock: element.stock + quantity,
              unitary: unitary
            };
          } else {
            return element;
          }
        });
        this.electronicsService.updateHistory(electronic.id, updatedHistory);
      }
    });

    this.client.electronicsPurchases.splice(index, 1);
    this.clientsService.update(this.client);
  }
}
