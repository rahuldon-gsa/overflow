import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import {Register} from './register';

@Component({
  selector: 'register-list',
  templateUrl: './register-list.component.html'
})
export class RegisterListComponent implements OnInit {

  registerList: Register[] = [];

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.registerService.list().subscribe((registerList: Register[]) => {
      this.registerList = registerList;
    });
  }
}
