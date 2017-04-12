import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../shared/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout(); 

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.errorMessage = sessionStorage.getItem('auth-message');

    if (sessionStorage.getItem('currentUser')) {
      console.log("User already logged in, redirecting to refering page");
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

}