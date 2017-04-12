import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod, Request, Response } from "@angular/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    message : string;

    constructor(private http: Http, private router: Router) {
    }

    authenticate(username: string, password: string) {
        const options = new RequestOptions();
        options.headers = new Headers({ 'Content-Type': 'application/json' });
        options.url = environment.serverUrl + 'api/login';
        options.body = JSON.stringify({ username: username, password: password });
        options.method = RequestMethod.Post;
        return this.http.request(new Request(options)).map((r: Response) => {

            // login successful if there's a jwt token in the response
            let user = r.json();
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('userRole', user.roles[0]);
            }
        });
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userRole');
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
    }
}