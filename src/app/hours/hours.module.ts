import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { HoursRoutingModule } from './hours-routing.module';
import { HoursRecordComponent } from './hours-record/hours-record.component';
import { RecordComponent } from './record/record.component';


@NgModule({
  declarations: [
    HoursRecordComponent,
    RecordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HoursRoutingModule
  ]
})
export class HoursModule { }
