import { Component } from '@angular/core';
import { NavService } from './nav.service';
import { OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/services/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  applicationData: any;
  isUserLogged: boolean = false;

  constructor(private navService: NavService, private authenticationService: AuthenticationService) {   
  }

  ngOnInit(): void {
    this.navService.getNavData().subscribe(res => this.applicationData = res);

    if (sessionStorage.getItem('currentUser')) {
      console.log("User already logged in, display logout link");
      this.isUserLogged = true;
    } 
  }

  logoutCurrentUser() {
    this.authenticationService.logout().subscribe(res => this.isUserLogged = false);
  } 
}
