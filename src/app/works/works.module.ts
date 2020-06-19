import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WorkCreateComponent } from './work-create/work-create.component';
import { WorkShowComponent } from './work-show/work-show.component';

@NgModule({
  declarations: [WorkCreateComponent, WorkShowComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [WorkCreateComponent, WorkShowComponent]
})
export class WorksModule {}
