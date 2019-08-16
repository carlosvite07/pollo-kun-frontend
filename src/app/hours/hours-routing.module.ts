import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoursRecordComponent } from './hours-record/hours-record.component';

const routes: Routes = [
  { path: 'horas', component: HoursRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoursRoutingModule { }
