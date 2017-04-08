import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Register} from './register';
import {RegisterService} from './register.service';
import {Response} from "@angular/http";


@Component({
  selector: 'register-persist',
  templateUrl: './register-persist.component.html'
})
export class RegisterPersistComponent implements OnInit {

  register = new Register();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private registerService: RegisterService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.registerService.get(+params['id']).subscribe((register: Register) => {
          this.create = false;
          this.register = register;
        });
      }
    });
  }

  save() {
    this.registerService.save(this.register).subscribe((register: Register) => {
      this.router.navigate(['/register', 'show', register.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
