import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GoogleSheetsDbService } from 'ng-google-sheets-db';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [GoogleSheetsDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
