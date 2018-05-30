import { Component, OnInit } from '@angular/core';
import {ZomatoapiService} from '../services/zomatoapi.service';
import {SelectItem} from 'primeng/api';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {InputParams} from '../models/input-params';

@Component({
  selector: 'app-restaurantinfo',
  templateUrl: './restaurantinfo.component.html',
  styleUrls: ['./restaurantinfo.component.css']
})



export class RestaurantinfoComponent implements OnInit {

  public cityList;
  public cityListDropdownSetting;

  public categoryList;
  public categoryListDropdownSetting;

  public cuisineList;
  public cuisineListDropdownSetting;

  public restaurants;
  constructor(private _zomatoApiService: ZomatoapiService) { }

  ngOnInit() {

    //this._zomatoApiService.searchRestaurant();

    this.initData();
  }

  initData() {



  }

  fetchCities(city: string){
    this._zomatoApiService.searchLocations(city).subscribe(cities =>{
      this.cityList = cities;
      this.cityListDropdownSetting = {
        singleSelection: true,
        text:"Select City",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class"
      };

    });

    this._zomatoApiService.getCategories().subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList);
    });

    this.categoryListDropdownSetting = {
      singleSelection: true,
      text:"Select City",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };
  }

  getCuisines(cityAndId: any){
    this._zomatoApiService.getCuisines(cityAndId.id, cityAndId.itemName).subscribe(data =>{
      this.cuisineList = data;
      this.cuisineListDropdownSetting = {
        singleSelection: true,
        text:"Select City",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class"
      };
    });
  }


  getRestaurantInfo(params: InputParams) {

    this._zomatoApiService.searchRestaurant(params).subscribe(restaurants =>{
      this.restaurants = restaurants;
    });
  }
}


