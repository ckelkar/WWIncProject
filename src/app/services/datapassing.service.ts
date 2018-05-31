import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DatapassingService {

  private nullifyResult = new Subject<boolean>();

  public triggeNullify = this.nullifyResult.asObservable();
  constructor() {

  }

  nullifyArray(trigger: boolean){
    this.nullifyResult.next(trigger);
  }
}
