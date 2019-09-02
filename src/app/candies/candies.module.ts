import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CandieCreateComponent } from './candie-create/candie-create.component';
import { CandieShowComponent } from './candie-show/candie-show.component';


@NgModule({
  declarations: [
    CandieCreateComponent,
    CandieShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    CandieCreateComponent,
    CandieShowComponent
  ]
})
export class CandiesModule { }
