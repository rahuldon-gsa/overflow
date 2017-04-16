import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { GlobalEventsManager } from '../shared/services/global-events-manager';

@Injectable()
export class AccountGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService,
    private globalEventsManager: GlobalEventsManager) { }

    canActivate() {

        if (sessionStorage.getItem('userRole') == 'ROLE_USER') {
            return true;
        } else {
            this.globalEventsManager.showMessage("Please login for accessing account");
        }
        return false;
    }
}