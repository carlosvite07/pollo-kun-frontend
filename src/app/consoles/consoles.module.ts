import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { ConsolesRoutingModule } from './consoles-routing.module';
import { ConsolesRecordComponent } from './consoles-record/consoles-record.component';
import { RecordComponent } from './consoles-show/consoles-show.component';


@NgModule({
  declarations: [
    ConsolesRecordComponent,
    RecordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConsolesRoutingModule
  ]
})
export class ConsolesModule { }
