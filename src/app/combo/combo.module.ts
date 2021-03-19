import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComboCreateComponent } from './combo-create/combo-create.component';


@NgModule({
  declarations: [ComboCreateComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [ComboCreateComponent]
})
export class ComboModule { }
