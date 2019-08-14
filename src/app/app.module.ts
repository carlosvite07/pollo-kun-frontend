import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { HoursRecordComponent } from './hours-record/hours-record.component';
import { CandiesComponent } from './candies/candies.component';
import { WorksComponent } from './works/works.component';
import { SummaryComponent } from './summary/summary.component';
import { StockComponent } from './stock/stock.component';
import { PricesComponent } from './prices/prices.component';
import { RecordComponent } from './record/record.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';

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
    RecordComponent,
    ModalComponentComponent
  ],
  entryComponents: [
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase, 'pollo-kun-firestone'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
