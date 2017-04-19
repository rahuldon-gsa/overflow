import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register } from './register';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { User } from '../user/user';

@Injectable()
export class RegisterService {

  private baseUrl = environment.serverUrl;

  constructor(private http: Http) {
  }

  uploadFile(formData: FormData): Observable<boolean> {
    const requestOptions = new RequestOptions();

    requestOptions.method = RequestMethod.Post;
    requestOptions.url = this.baseUrl + 'register/upload';
    requestOptions.headers = new Headers({
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    requestOptions.body = formData;
    return this.http.request(new Request(requestOptions)).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
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

  findUser(username: string): Observable<User> {
    return this.http.get(this.baseUrl + 'register/changeUserPassword?username=' + username).map((r: Response) => new User(r.json()));
  }

  getUsername(firstName: string, lastName: string, mobile: string): Observable<Register> {
    return this.http.get(this.baseUrl + 'register/getUserName?firstName=' + firstName + '&lastName=' + lastName + '&mobile=' + mobile).map((r: Response) => new Register(r.json()));
  }

  resetPassword(username: string): Observable<boolean> {
    const options = new RequestOptions();
    options.url = this.baseUrl + 'register/resetPassword';
    options.body = JSON.stringify({ username: username });
    options.method = RequestMethod.Post;
    options.headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    console.log("Request Options ::  " + options.body);
    return this.http.request(new Request(options)).map((res: Response) => res.ok);
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