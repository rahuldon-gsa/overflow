import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list.component';
import { AccountPersistComponent } from './account-persist.component';
import { AccountShowComponent } from './account-show.component';
import { AccountGuard } from './account.guard';

const routes: Routes = [
  { path: 'account', redirectTo: 'account/list', pathMatch: 'full' },
  { path: 'account/list', component: AccountListComponent , canActivate: [AccountGuard] },
  { path: 'account/create', component: AccountPersistComponent, canActivate: [AccountGuard] },
  { path: 'account/edit/:id', component: AccountPersistComponent, canActivate: [AccountGuard] },
  { path: 'account/show/:id', component: AccountShowComponent, canActivate: [AccountGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AccountGuard
  ]
})
export class AccountRoutingModule { }