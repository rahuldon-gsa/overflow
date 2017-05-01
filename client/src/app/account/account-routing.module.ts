import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPersistComponent } from './account-persist.component';
import { AccountGuard } from './account.guard';

const routes: Routes = [
  { path: 'account', redirectTo: 'account/list', pathMatch: 'full' },
  { path: 'account/create', component: AccountPersistComponent, canActivate: [AccountGuard] },
  { path: 'account/edit/:id', component: AccountPersistComponent, canActivate: [AccountGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AccountGuard
  ]
})
export class AccountRoutingModule { }