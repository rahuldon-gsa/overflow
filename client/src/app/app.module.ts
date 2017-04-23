import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastyModule } from 'ng2-toasty'; 
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { RegisterModule } from './register/register.module';
import { EqualValidator } from "./shared/validators/equal-validator.directive";
import { LoginModule } from './login/login.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { GlobalEventsManager } from './shared/services/global-events-manager';
import { AccountModule } from './account/account.module';
import { TimeoutModalComponent } from './shared/component/timeout-modal/timeout-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    EqualValidator,
    TimeoutModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot(), 
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    RegisterModule,
    LoginModule,
    AccountModule 
],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, NavService, AuthenticationService, GlobalEventsManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
