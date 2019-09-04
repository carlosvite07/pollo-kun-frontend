import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsolesModule } from '../consoles/consoles.module';
import { CandiesModule } from '../candies/candies.module';
import { ComputersModule } from '../computers/computers.module';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients-create/clients-create.component';
import { ClientsShowComponent } from './clients-show/clients-show.component';

@NgModule({
  declarations: [
    ClientsComponent, 
    ClientsShowComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClientsRoutingModule,
    NgbModule,
    ConsolesModule,
    CandiesModule,
    ComputersModule
  ]
})
export class ClientsModule { }
