import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavService } from './nav.service';
import { AuthenticationService } from "../shared/services/authentication.service";
import { GlobalEventsManager } from '../shared/services/global-events-manager';


@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  applicationData: any;
  isUserLogged: boolean = false;
  isUserAdmin: boolean = false;
  isNormalUser: boolean = false;

  constructor(private navService: NavService, private authenticationService: AuthenticationService,
    private globalEventsManager: GlobalEventsManager) {

    this.globalEventsManager.showNavBarEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.isUserLogged = mode;
      }
      this.setUserRole();
    });
  }

  setUserRole() {
    let userRole = sessionStorage.getItem('userRole');
    if (userRole === 'ROLE_ADMIN') {
      this.isUserAdmin = true;
      this.isUserLogged = true;
      this.isNormalUser = false;
    } else if (userRole === 'ROLE_USER') {
      this.isNormalUser = true;
      this.isUserLogged = true;
      this.isUserAdmin = false;
    } else{
      this.isNormalUser = false;
      this.isUserLogged = false;
      this.isUserAdmin = false;
    }
  }

  ngOnInit(): void {
    this.navService.getNavData().subscribe(res => this.applicationData = res);
  }

  logoutCurrentUser() {
    this.authenticationService.logout().subscribe(res => this.isUserLogged = false);
  }

}
