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

  public cityList;
  public cityListDropdownSetting;

  public categoryList;
  public categoryListDropdownSetting;

  public cuisineList;
  public cuisineListDropdownSetting;

  public restaurants;

  private ZomatoAPIServiceSubscription: ISubscription;

  constructor(private _zomatoApiService: ZomatoapiService) {
  }

  ngOnInit() {

  }



  fetchCities(city: string) {
    this.ZomatoAPIServiceSubscription= this._zomatoApiService.searchLocations(city).subscribe(cities => {
      this.cityList = cities;
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
      console.log(this.categoryList);
    });

    this.categoryListDropdownSetting = {
      singleSelection: true ,
      text: 'Select Category' ,
      selectAllText: 'Select All' ,
      unSelectAllText: 'UnSelect All' ,
      enableSearchFilter: true ,
      classes: 'myclass custom-class'
    };
  }

  getCuisines(cityAndId: any) {
    this.ZomatoAPIServiceSubscription = this._zomatoApiService.getCuisines(cityAndId.id , cityAndId.itemName).subscribe(data => {
      this.cuisineList = data;
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


  getRestaurantInfo(params: InputParams) {

    this.ZomatoAPIServiceSubscription = this._zomatoApiService.searchRestaurant(params).subscribe(
      restaurants => {
        this.restaurants = restaurants;
        console.log(this.restaurants);
        console.log(this.restaurants);
      } , (err: any) => {
        console.log(err);
      });
  }

  ngOnDestroy(){
    this.ZomatoAPIServiceSubscription.unsubscribe();
  }
}



