import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Register} from './register';
import {RegisterService} from './register.service';

@Component({
  selector: 'register-persist',
  templateUrl: './register-show.component.html'
})
export class RegisterShowComponent implements OnInit {

  register = new Register();

  constructor(private route: ActivatedRoute, private registerService: RegisterService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.registerService.get(+params['id']).subscribe((register: Register) => {
        this.register = register;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.registerService.destroy(this.register).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/register','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
