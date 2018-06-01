import {Component , Input , OnDestroy , OnInit} from '@angular/core';
import {DatapassingService} from '../../services/datapassing.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-restaurantresults',
  templateUrl: './restaurantresults.component.html',
  styleUrls: ['./restaurantresults.component.css']
})
export class RestaurantresultsComponent implements OnInit, OnDestroy {

  @Input() restaurants; // filtered restaurant results from API
  constructor(private _dataPassingService: DatapassingService) { }

  private dataPassingServiceSubscription: ISubscription; // checks for the flag from other child which clears the display list

  ngOnInit() {
    this.dataPassingServiceSubscription = this._dataPassingService.triggeNullify.subscribe(flag => {
       if (flag) {
         this.restaurants = [];
       }
    },(err: any) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.dataPassingServiceSubscription.unsubscribe();
  }

}
