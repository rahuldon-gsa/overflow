import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod, Request, Response } from "@angular/http";

import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable()
export class NavService {

  private baseUrl = environment.serverUrl;

  _navData: Observable<any>;

  constructor(private http: Http) { }

  getNavData(): Observable<any> {
    if (!this._navData) {
      const options = new RequestOptions();
      options.headers = new Headers({ 'Content-Type': 'application/json' });
      options.url = environment.serverUrl + 'application';
      options.method = RequestMethod.Get;
      this._navData = this.http.request(new Request(options))
        .map((res: Response) => res.json())
        .publishReplay()
        .refCount();
    }
    return this._navData;
  }
}
