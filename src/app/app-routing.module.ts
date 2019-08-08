import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoursRecordComponent } from './hours-record/hours-record.component';
import { CandiesComponent } from './candies/candies.component';
import { WorksComponent } from './works/works.component';
import { PricesComponent } from './prices/prices.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path:'horas', component: HoursRecordComponent},
  { path:'dulces', component: CandiesComponent},
  { path:'trabajos', component: WorksComponent},
  { path:'dulces', component: CandiesComponent},
  { path:'precios', component: PricesComponent},
  { path:'resumen', component: SummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
