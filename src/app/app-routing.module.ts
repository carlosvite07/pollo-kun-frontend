import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandiesComponent } from './candies/candies.component';
import { WorksComponent } from './works/works.component';
import { PricesComponent } from './prices/prices.component';
import { SummaryComponent } from './summary/summary.component';
import { StationeryComponent } from './stationery/stationery.component';

const routes: Routes = [
  { path: '', redirectTo: '/horas', pathMatch: 'full' },
  { path: 'dulces', component: CandiesComponent },
  { path: 'trabajos', component: WorksComponent },
  { path: 'dulces', component: CandiesComponent },
  { path: 'papeleria', component: StationeryComponent },
  { path: 'precios', component: PricesComponent },
  { path: 'resumen', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
