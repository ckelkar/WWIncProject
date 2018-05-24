import {Inject, Injectable} from '@angular/core';
import {IAppConfig} from '../configuration/app-config.interface';
import {CONFIG} from '../configuration/app-config.constants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable()
export class ZomatoapiService {

  constructor(@Inject( CONFIG ) private config: IAppConfig, private http: HttpClient) {

  }

  searchRestaurant() {
    console.log(this.config.ZOMATO_API_KEY);
    // let params = new HttpParams();
    // let headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json')
    let api_url = 'https://developers.zomato.com/api/v2.1/search';

   // params.set('entity_id', '280');

  /*  headers.append('Content-Type', 'application/json');
    params.append('user-key', this.config.ZOMATO_API_KEY);*/


    this.http.get(api_url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-key': this.config.ZOMATO_API_KEY
      })
    })
      .subscribe((data: any) => {
        console.log(data);
      });
  }

}
