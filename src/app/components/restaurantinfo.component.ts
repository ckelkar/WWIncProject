import { Component, OnInit } from '@angular/core';
import {ZomatoapiService} from '../services/zomatoapi.service';

@Component({
  selector: 'app-restaurantinfo',
  templateUrl: './restaurantinfo.component.html',
  styleUrls: ['./restaurantinfo.component.css']
})
export class RestaurantinfoComponent implements OnInit {

  constructor(private _zomatoApiService: ZomatoapiService) { }

  ngOnInit() {

    this._zomatoApiService.searchRestaurant();
  }

}
