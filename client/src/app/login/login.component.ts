
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../shared/services/authentication.service";
import { GlobalEventsManager } from '../shared/services/global-events-manager';
import { RegisterService } from '../register/register.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, RegisterService]
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;
  isPassword: boolean = false;
  isUsername: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private globalEventsManager: GlobalEventsManager,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.errorMessage = sessionStorage.getItem('auth-message');

    if (sessionStorage.getItem('currentUser')) {
      console.log("User already logged in, redirecting to refering page");
      this.globalEventsManager.showMessage("User already logged in !!");
      this.router.navigate([this.returnUrl || '/']);
    }
  }

  ngOnDestroy() {
    this.errorMessage = '';
    sessionStorage.removeItem('auth-message');
  }

  login() {
    this.loading = true;
    this.errorMessage = '';

    // If user is already logged in skip and show message
    this.authenticationService.authenticate(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.globalEventsManager.showNavBar(true);
        this.router.navigate([this.returnUrl || '/']);
      },
      error => {
        this.loading = false;
        if (error.status == 401) {
          this.errorMessage = "User is not authorized, please check username and password";
        } else {
          this.errorMessage = error;
        }
      });
  }

  forgetPassword() {
    this.isPassword = true;
  }

  retrievePassword() {

    this.errorMessage = "";

    this.registerService.findUser(this.model.username).subscribe(() => {
      console.log("Password changed successfully for : " + this.model.username);
      this.isPassword = false;
      this.globalEventsManager.showMessage("Password changed successfully to World@24");
    },
      error => {
        this.loading = false;
        if (error.status == 401 || error.status == 404) {
          this.errorMessage = "User is not authorized, please check username";
        } else {
          this.errorMessage = error;
        }
      });
  }

  loginAgain() {
    this.isUsername = false;
    this.isPassword = false;
  }

  forgetUserName() {
    this.isUsername = true;
  }

  retrieveUsername() {

    this.errorMessage = "";

    this.registerService.getUsername(this.model.firstName, this.model.lastName, this.model.mobile).subscribe((register: any) => {
      console.log("Username found successfully for : " + this.model.firstName);
      this.errorMessage = "Your username is : " + register.email
      this.isUsername = false;
      this.model.username = register.email;
      this.globalEventsManager.showMessage("Username found !!");
    },
      error => {
        this.loading = false;
        if (error.status == 401 || error.status == 404) {
          this.errorMessage = "User is not authorized, please check username";
        } else {
          this.errorMessage = error;
        }
      });
  }

}
