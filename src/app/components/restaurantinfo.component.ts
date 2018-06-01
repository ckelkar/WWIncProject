import {Component , OnDestroy , OnInit} from '@angular/core';
import {ZomatoapiService} from '../services/zomatoapi.service';
import {SelectItem} from 'primeng/api';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {InputParams} from '../models/input-params';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-restaurantinfo',
  templateUrl: './restaurantinfo.component.html',
  styleUrls: ['./restaurantinfo.component.css']
})



export class RestaurantinfoComponent implements OnInit,OnDestroy {

  public cityList; // gets relevant city list from API
  public cityListDropdownSetting; // dropdown setting for city list

  public categoryList; // gets category list from API
  public categoryListDropdownSetting; // dropdown setting for category list

  public cuisineList; // gets cuisine list from API
  public cuisineListDropdownSetting; // dropdown setting for cuisine list

  public restaurants; // gets all the filtered restaurant info

  private ZomatoAPIServiceSubscription: ISubscription;

  constructor(private _zomatoApiService: ZomatoapiService) {
  }

  ngOnInit() {

  }


// fetches relevant cities of entered query and creates list
  fetchCities(city: string) {
    this.ZomatoAPIServiceSubscription = this._zomatoApiService.searchLocations(city).subscribe(cities => {
      this.cityList = cities;

      // city list dropdown setting
      this.cityListDropdownSetting = {
        singleSelection: true ,
        text: 'Select City' ,
        selectAllText: 'Select All' ,
        unSelectAllText: 'UnSelect All' ,
        enableSearchFilter: true ,
        classes: 'myclass custom-class'
      };

    }, (err: any) => {
      console.log(err);
    });

    this.ZomatoAPIServiceSubscription = this._zomatoApiService.getCategories().subscribe(data => {
      this.categoryList = data;
    });

    // category list dropdown setting
    this.categoryListDropdownSetting = {
      singleSelection: true ,
      text: 'Select Category' ,
      selectAllText: 'Select All' ,
      unSelectAllText: 'UnSelect All' ,
      enableSearchFilter: true ,
      classes: 'myclass custom-class'
    };
  }

  // fetches cuisines
  getCuisines(cityAndId: any) {
    this.ZomatoAPIServiceSubscription = this._zomatoApiService.getCuisines(cityAndId.id , cityAndId.itemName).subscribe(data => {
      this.cuisineList = data;

      // cuisine list dropdown setting
      this.cuisineListDropdownSetting = {
        singleSelection: true ,
        text: 'Select Cuisines' ,
        selectAllText: 'Select All' ,
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true ,
        classes: 'myclass custom-class'
      };
    }, (err: any) => {
      console.log(err);
    });
  }


  // fetches restaurant info
  getRestaurantInfo(params: InputParams) {

    this.ZomatoAPIServiceSubscription = this._zomatoApiService.searchRestaurant(params).subscribe(
      restaurants => {
        this.restaurants = restaurants;
      } , (err: any) => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    this.ZomatoAPIServiceSubscription.unsubscribe();
  }
}



