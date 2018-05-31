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
import {DropdownModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {CardModule} from 'primeng/card';
import {DatapassingService} from './services/datapassing.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



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
    HttpClientModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    CardModule,
    NgbModule
  ],
  providers: [
    {
      provide: CONFIG,
      useValue: APP_SETTINGS
    },
    [ZomatoapiService,DatapassingService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
