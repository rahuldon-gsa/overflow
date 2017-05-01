import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RegisterService} from './register.service';


import {RegisterRoutingModule} from './register-routing.module';
import {RegisterPersistComponent} from './register-persist.component';

@NgModule({
  declarations: [
    RegisterPersistComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    RegisterRoutingModule,
    NgbModule
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule {}