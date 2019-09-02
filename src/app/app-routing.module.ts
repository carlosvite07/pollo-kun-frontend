import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricesComponent } from './prices/prices.component';
import { SummaryComponent } from './summary/summary.component';
// import { CandiesComponent } from './candies/candies.component';
// import { WorksComponent } from './works/works.component';
// import { StationeryComponent } from './stationery/stationery.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'precios', component: PricesComponent },
  { path: 'resumen', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
