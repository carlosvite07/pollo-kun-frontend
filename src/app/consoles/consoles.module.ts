import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConsolesRecordComponent } from './consoles-record/consoles-record.component';
import { ConsolesShowComponent } from './consoles-show/consoles-show.component';

@NgModule({
  declarations: [ConsolesRecordComponent, ConsolesShowComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [ConsolesRecordComponent, ConsolesShowComponent]
})
export class ConsolesModule {}
