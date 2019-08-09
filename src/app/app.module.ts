import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NavbarComponent } from './navbar/navbar.component';
import { HoursRecordComponent } from './hours-record/hours-record.component';
import { CandiesComponent } from './candies/candies.component';
import { WorksComponent } from './works/works.component';
import { SummaryComponent } from './summary/summary.component';
import { StockComponent } from './stock/stock.component';
import { PricesComponent } from './prices/prices.component';
import { RecordComponent } from './record/record.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HoursRecordComponent,
    CandiesComponent,
    WorksComponent,
    SummaryComponent,
    StockComponent,
    PricesComponent,
    RecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
