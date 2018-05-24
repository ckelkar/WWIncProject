import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_SETTINGS, CONFIG} from './configuration/app-config.constants'


import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RestaurantinfoComponent } from './components/restaurantinfo.component';
import { RestaurantresultsComponent } from './components/restaurantresults/restaurantresults.component';
import { HttpClientModule } from '@angular/common/http';
import {ZomatoapiService} from './services/zomatoapi.service';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    RestaurantinfoComponent,
    RestaurantresultsComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: CONFIG,
      useValue: APP_SETTINGS
    },
    [ZomatoapiService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
