import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable()
export class AccountGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate() {

        if (sessionStorage.getItem('userRole') == 'ROLE_USER') {
            return true;
        }

        this.authenticationService.logout();
        sessionStorage.setItem('auth-message', "Please login as user role for accessing account");
        //this.router.navigate(['/login']);
        return false;
    }
}