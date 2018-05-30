import {Component , Input , OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurantresults',
  templateUrl: './restaurantresults.component.html',
  styleUrls: ['./restaurantresults.component.css']
})
export class RestaurantresultsComponent implements OnInit {

  @Input() restaurants;
  constructor() { }

  ngOnInit() {
  }

}
