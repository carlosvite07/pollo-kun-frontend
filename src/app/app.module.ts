import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

import { SummaryComponent } from './summary/summary.component';
import { PricesComponent } from './prices/prices.component';

import { ClientsModule } from './clients/clients.module';
import { ComboModule } from './combo/combo.module';
import { ConsolesModule } from './consoles/consoles.module';
import { ConsoleComponent } from './prices/consoles-prices/consoles-prices.component';
import { CandiesPricesComponent } from './prices/candies-prices/candies-prices.component';
import { WorksPricesComponent } from './prices/works-prices/works-prices.component';
import { ArticlesPricesComponent } from './prices/articles-prices/articles-prices.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModalsNotificationsComponent } from './modals-notifications/modals-notifications.component';
import { ComputersPricesComponent } from './prices/computers-prices/computers-prices.component';
import { ElectronicsPricesComponent } from './prices/electronics-prices/electronics-prices.component';
import { ComboModalComponent } from './combo-modal/combo-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummaryComponent,
    PricesComponent,
    ConsoleComponent,
    CandiesPricesComponent,
    WorksPricesComponent,
    ArticlesPricesComponent,
    NotificationsComponent,
    ModalsNotificationsComponent,
    ComputersPricesComponent,
    ElectronicsPricesComponent,
    ComboModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ComboModule,
    ConsolesModule,
    ClientsModule,
    AngularFireModule.initializeApp(
      environment.firebase,
      'pollo-kun-firestone'
    ), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
