import {Inject, Injectable} from '@angular/core';
import {IAppConfig} from '../configuration/app-config.interface';
import {CONFIG} from '../configuration/app-config.constants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {reduce, flatMap} from 'rxjs/operators';
import {from} from 'rxjs/observable/from';
import {InputParams} from '../models/input-params';
import {map} from 'rxjs/operator/map';



@Injectable()
export class ZomatoapiService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json' ,
    'user-key': this.config.ZOMATO_API_KEY
  });

  constructor(@Inject(CONFIG) private config: IAppConfig , private http: HttpClient) {

  }

  searchRestaurant( parameters: InputParams): Observable<any> {

    let params = new HttpParams();

    const api_url = 'https://developers.zomato.com/api/v2.1/search';


    params = params.append('entity_id' , parameters.location.toString());
    params = params.append('category', parameters.category.toString());
    params = params.append('cuisines', parameters.cuisine.toString());
    params = params.append('start', parameters.offset.toString());
    params = params.append('count', parameters.limit.toString());
    params = params.append('entity_type', 'city');

    const restaurants = this.http.get(api_url , {
      headers: this.headers,
      params: params
    }).pipe(

      flatMap((response: any) => from(response.restaurants)),
      reduce((acc, cur) => {
        const newObj = {
          name: (cur as any).restaurant.name,
          location: (cur as any).restaurant.location,
          photos: (cur as any).restaurant.photos_url,
          menu : (cur as any).restaurant.menu_url,
          image: (cur as any).restaurant.featured_image
        }
        acc.push(newObj);
        return acc;
      }, [])
    )
      return restaurants;
  }

  getCategories(): Observable<any> {
    const api_url = 'https://developers.zomato.com/api/v2.1/categories';

    const categories = this.http.get(api_url ,
      {
        headers: this.headers
      }).pipe(
      flatMap((response: any) => from(response.categories)),
      reduce((acc, cur) => {
        const newObj = {
          id: (cur as any).categories.id,
          itemName: (cur as any).categories.name
        }
        acc.push(newObj);
        return acc;
      }, [])
    )

    return categories;

  }

  searchLocations(q: string): Observable<any> {
    const params = new HttpParams();
    const api_url = 'https://developers.zomato.com/api/v2.1/cities';

    const cities = this.http.get(api_url , {
      headers: this.headers,
      params: params.append('q' , q)
    }).pipe(
      flatMap((response: any) => from(response.location_suggestions)),
      reduce((acc, cur) => {
        const newObj = {
          id: (cur as any).id,
          itemName: (cur as any).name
        }
        acc.push(newObj);
        return acc;
      }, [])
    )

    return cities;
  }

  getCuisines(id: number, city: string): Observable<any> {
    let params = new HttpParams();
    const api_url = 'https://developers.zomato.com/api/v2.1/cuisines';

    params = params.append('city_id' , id.toString());

    const cousines = this.http.get(api_url , {
      headers: this.headers ,
      params: params
    }).pipe(
      flatMap((response: any) => from(response.cuisines)),
      reduce((acc, cur) => {
        const newObj = {
          id: (cur as any).cuisine.cuisine_id,
          itemName: (cur as any).cuisine.cuisine_name
        }
        acc.push(newObj);
        return acc;
      }, [])
    )

    return cousines;
  }




}
