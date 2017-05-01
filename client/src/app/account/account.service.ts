import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Account } from './account';
import { Subject } from 'rxjs/Subject';
import * as _ from "lodash";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  private baseUrl = environment.serverUrl;

  constructor(private http: Http) {
  }

  list(): Observable<Account[]> {
    let subject = new Subject<Account[]>();
    this.http.get(this.baseUrl + 'account')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Account(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Account> {
    return this.http.get(this.baseUrl + 'account/' + id)
      .map((r: Response) => new Account(r.json()));
  }

  save(account: Account): Observable<Account> {
    const requestOptions = new RequestOptions();
    if (account.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'account/' + account.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'account';

      let birthDate = new Date();
      birthDate.setMonth(account.dateOfBirth.month - 1);
      birthDate.setDate(account.dateOfBirth.day);
      birthDate.setFullYear(account.dateOfBirth.year);

      account.dateOfBirth = null;
      account.dateOfBirth = birthDate;
      
      account.num = _.random(0, 99999999).toString();
    }


    requestOptions.body = JSON.stringify(account);
    requestOptions.headers = new Headers({ "Content-Type": "application/json" });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Account(r.json()));
  }

  destroy(account: Account): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'account/' + account.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}