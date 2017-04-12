import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Account} from './account';
import {AccountService} from './account.service';

@Component({
  selector: 'account-persist',
  templateUrl: './account-show.component.html'
})
export class AccountShowComponent implements OnInit {

  account = new Account();

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.accountService.get(+params['id']).subscribe((account: Account) => {
        this.account = account;
      });
    });
  }

  destroy() {
    if (confirm("Are you sure?")) {
      this.accountService.destroy(this.account).subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/account','list']);
        } else {
          alert("Error occurred during delete");
        }
      });
    }
  }

}
