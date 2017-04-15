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

        this.authenticationService.logout().subscribe(res => {
            location.reload()
            this.router.navigate(['/login'])
        });

        sessionStorage.setItem('auth-message', "Please login for accessing account");
        return false;
    }
}