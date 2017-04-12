import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';
import {Account} from './account';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html'
})
export class AccountListComponent implements OnInit {

  accountList: Account[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.list().subscribe((accountList: Account[]) => {
      this.accountList = accountList;
    });
  }
}
