import { Electronic } from "./electronic.model";

export class ElectronicPurchase {
  electronic: Electronic;
  price: number;
  date: Date;
  quantity: number;
  paid: boolean;
  profit: number;
  unitary: number;
}
