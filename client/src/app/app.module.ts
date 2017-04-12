import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { RegisterModule } from './register/register.module';
import { EqualValidator } from "./shared/validators/equal-validator.directive";
import { LoginModule } from './login/login.module';
import { AuthenticationService } from './shared/services/authentication.service'; 
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RegisterModule,
    LoginModule,
    AccountModule
],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
