import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConsolesRoutingModule } from './consoles-routing.module';
import { ConsolesRecordComponent } from './consoles-record/consoles-record.component';
import { ConsolesShowComponent } from './consoles-show/consoles-show.component';
import { ConsolesNotificationsComponent } from './consoles-notifications/consoles-notifications.component';


@NgModule({
  declarations: [
    ConsolesRecordComponent,
    ConsolesShowComponent,
    ConsolesNotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConsolesRoutingModule,
    NgbModule
  ],
  exports: [
    ConsolesRecordComponent,
    ConsolesShowComponent,
    ConsolesNotificationsComponent
  ]
})
export class ConsolesModule { }