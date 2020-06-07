import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ElectronicCreateComponent } from "./electronic-create/electronic-create.component";
import { ElectronicShowComponent } from "./electronic-show/electronic-show.component";

@NgModule({
  declarations: [ElectronicCreateComponent, ElectronicShowComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [ElectronicCreateComponent, ElectronicShowComponent],
})
export class ElectronicsModule {}
