import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeproviderService {

  constructor(private _httprequester : HttpClient) { }

  gettime(){
    return this._httprequester.get("https://worldtimeapi.org/api/timezone/asia/kolkata");
};
  }
