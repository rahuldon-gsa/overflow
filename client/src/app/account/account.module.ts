import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from './account.service';


import {AccountRoutingModule} from './account-routing.module';
import {AccountShowComponent} from './account-show.component';
import {AccountListComponent} from './account-list.component';
import {AccountPersistComponent} from './account-persist.component';
import { DepositComponent } from './deposit/deposit.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountPersistComponent,
    AccountShowComponent,
    DepositComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    NgbModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule {}