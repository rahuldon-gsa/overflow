import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register } from './register';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {

  private baseUrl = environment.serverUrl;

  constructor(private http: Http) {
  }

  list(): Observable<Register[]> {
    let subject = new Subject<Register[]>();
    this.http.get(this.baseUrl + 'register')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Register(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Register> {
    return this.http.get(this.baseUrl + 'register/' + id)
      .map((r: Response) => new Register(r.json()));
  }

  save(register: Register): Observable<Register> {
    const requestOptions = new RequestOptions();
    if (register.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'register/' + register.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'register';
    }
    requestOptions.body = JSON.stringify(register);
    requestOptions.headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Register(r.json()));
  }

  destroy(register: Register): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'register/' + register.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}