import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RegisterPersistComponent} from './register-persist.component';

const routes: Routes = [
  {path: 'register', redirectTo: 'register/list', pathMatch: 'full'},
  {path: 'register/create', component: RegisterPersistComponent},
  {path: 'register/edit/:id', component: RegisterPersistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}