import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';

import { CandiesComponent } from './candies/candies.component';
import { WorksComponent } from './works/works.component';
import { SummaryComponent } from './summary/summary.component';
import { StockComponent } from './stock/stock.component';
import { PricesComponent } from './prices/prices.component';

import { ConsolesModalComponent } from './consoles/consoles-modal/consoles-modal.component';

import { ConsolesModule } from './consoles/consoles.module';
import { StationeryComponent } from './stationery/stationery.component';
import { ConsoleComponent } from './prices/consoles-prices/consoles-prices.component';
import { CandiesPricesComponent } from './prices/candies-prices/candies-prices.component';
import { WorksPricesComponent } from './prices/works-prices/works-prices.component';
import { ArticlesPricesComponent } from './prices/articles-prices/articles-prices.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CandiesComponent,
    WorksComponent,
    SummaryComponent,
    StockComponent,
    PricesComponent,
    ConsolesModalComponent,
    StationeryComponent,
    ConsoleComponent,
    CandiesPricesComponent,
    WorksPricesComponent,
    ArticlesPricesComponent
  ],
  entryComponents: [
    ConsolesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ConsolesModule,
    AngularFireModule.initializeApp(environment.firebase, 'pollo-kun-firestone'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
