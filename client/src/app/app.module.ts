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
    RegisterModule
],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
