import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComputerCreateComponent } from './computer-create/computer-create.component';
import { ComputerShowComponent } from './computer-show/computer-show.component';


@NgModule({
  declarations: [
    ComputerCreateComponent,
    ComputerShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    ComputerCreateComponent,
    ComputerShowComponent
  ]
})
export class ComputersModule { }
