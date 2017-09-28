import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HotelDetailsComponent, NgbdModalContent} from './modules/hotel-details.component';
import {XhrService} from './services/xhr.service';
import { HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [

    AppComponent,
    HotelDetailsComponent,
    NgbdModalContent
  ],
  imports: [
    FormsModule,
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule
  ],
  entryComponents: [NgbdModalContent],
  providers: [XhrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
