import { Component, OnInit, Input } from "@angular/core";
import { Electronic } from "../electronic.model";
import { ElectronicsService } from "../electronics.service";
import { ElectronicPurchase } from "../electronic-purchase.model";
import { ClientsService } from "../../clients/clients.service";

@Component({
  selector: "app-electronic-create",
  templateUrl: "./electronic-create.component.html",
  styleUrls: ["./electronic-create.component.scss"],
})
export class ElectronicCreateComponent implements OnInit {
  @Input() client;
  allElectronics: Electronic[] = [];
  selectedElectronic: Electronic;
  selectedPrice: number;
  selectedQuantity: number = 1;
  errorElectronic: boolean = false;
  errorQuantity: boolean = false;
  stock: number = 0;
  successPurchase = false;

  constructor(
    private electronicsService: ElectronicsService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.electronicsService.getAllElectronics().subscribe((data) => {
      this.allElectronics = data.map((e) => {
        const electronicResp = e.payload.doc.data() as Electronic;
        return {
          id: e.payload.doc.id,
          name: electronicResp.name,
          price: electronicResp.price,
          history: electronicResp.history,
        } as Electronic;
      });
    });
  }

  onChangeSelection(): void {
    this.stock = 0;
    this.selectedPrice = this.selectedElectronic.price;
    this.errorElectronic = false;
    this.selectedElectronic.history.forEach(
      (element) => (this.stock += element.stock)
    );
    this.errorQuantity =
      this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
  }

  onChangeQuantity(): void {
    this.errorQuantity =
      this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
  }

  electronicPurchaseConfirm(): void {
    this.errorElectronic = this.selectedElectronic ? false : true;
    this.errorQuantity =
      this.selectedQuantity <= 0 || this.stock < this.selectedQuantity;
    if (this.errorElectronic || this.errorQuantity) {
      return;
    }

    let quantityBuyed = this.selectedQuantity;
    let history = this.selectedElectronic.history;

    if (!this.client.electronicsPurchases) {
      this.client.electronicsPurchases = [];
    }

    this.selectedElectronic.history.forEach((element, index) => {
      if (element.stock < quantityBuyed) {
        if (element.stock !== 0 && quantityBuyed !== 0) {
          quantityBuyed -= element.stock;
          this.createPurchase(
            this.selectedPrice,
            element.unitary,
            element.stock,
            this.selectedElectronic
          );
          history[index].stock = 0;
          this.electronicsService.updateHistory(this.selectedElectronic.id, history);
        }
      } else {
        if (quantityBuyed !== 0) {
          this.createPurchase(
            this.selectedPrice,
            element.unitary,
            quantityBuyed,
            this.selectedElectronic
          );
          history[index].stock -= quantityBuyed;
          quantityBuyed = 0;
          this.electronicsService.updateHistory(this.selectedElectronic.id, history);
        }
      }
    });

    this.selectedElectronic = undefined;
    this.selectedQuantity = 1;
  }

  createPurchase(
    electronicPrice: number,
    unitary: number,
    quantityBuyed: number,
    electronic: Electronic
  ): void {
    const profit = (electronicPrice - unitary) * quantityBuyed;
    const newPurchase = {
      date: new Date(),
      electronic: electronic,
      quantity: quantityBuyed,
      price: quantityBuyed * electronicPrice,
      paid: false,
      profit: parseFloat(profit.toFixed(2)),
      unitary: unitary,
    } as ElectronicPurchase;
    this.client.electronicsPurchases.unshift(newPurchase);
    this.clientsService.update(this.client);
  }
}
