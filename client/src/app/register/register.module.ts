import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {RegisterService} from './register.service';


import {RegisterRoutingModule} from './register-routing.module';
import {RegisterShowComponent} from './register-show.component';
import {RegisterListComponent} from './register-list.component';
import {RegisterPersistComponent} from './register-persist.component';

@NgModule({
  declarations: [
    RegisterListComponent,
    RegisterPersistComponent,
    RegisterShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule {}