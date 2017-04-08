import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RegisterListComponent} from './register-list.component';
import {RegisterPersistComponent} from './register-persist.component';
import {RegisterShowComponent} from './register-show.component';

const routes: Routes = [
  {path: 'register', redirectTo: 'register/list', pathMatch: 'full'},
  {path: 'register/list', component: RegisterListComponent},
  {path: 'register/create', component: RegisterPersistComponent},
  {path: 'register/edit/:id', component: RegisterPersistComponent},
  {path: 'register/show/:id', component: RegisterShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}