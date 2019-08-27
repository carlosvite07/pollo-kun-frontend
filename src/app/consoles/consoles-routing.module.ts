import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsolesRecordComponent } from './consoles-record/consoles-record.component';

const routes: Routes = [
  { path: 'consolas', component: ConsolesRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolesRoutingModule { }