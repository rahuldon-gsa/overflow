import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Account } from './account';
import { AccountService } from './account.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
import { State } from '../shared/interfaces/state';
import { GlobalEventsManager } from '../shared/services/global-events-manager';

@Component({
  selector: 'account-persist',
  templateUrl: './account-persist.component.html',
  styleUrls: ['./account.component.css'],
  providers: [DatePipe]
})
export class AccountPersistComponent implements OnInit {

  stateJson = require('../shared/data/states.json');
  account = new Account();
  create = true;
  errors: any[];
  incomeSources = ['Employment Income', 'Inheritance or Trust', 'Investment Income', 'Retirement Income', 'Social Security', 'Unemployment', 'Household Income']
  stateList = [];
  accountList: Account[] = [];
  birthDate: any;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router, private datePipe: DatePipe,
    private globalEventsManager: GlobalEventsManager) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.accountService.get(+params['id']).subscribe((account: Account) => {
          this.create = false;
          this.account = account;
          this.updateBirthDate();
        });
      }
    });

    this.stateList = _.toArray(this.stateJson);

    this.accountService.list().subscribe((accountList: Account[]) => {
      this.accountList = accountList;
    });

  }

  updateBirthDate() {
    this.birthDate = this.datePipe.transform(this.account.dateOfBirth, 'yyyy-MM-dd');
  }

  lockAccount(value) {
    if (value !== undefined) {
      this.account.type = value;
    }
  }

  goBack() {
    this.account.type = null;
  }

  save() {
    if (!this.create) {
     
      let birthDate1 = new Date(this.birthDate);
      birthDate1.setMonth(this.birthDate.month - 1);  

      this.account.dateOfBirth = birthDate1;
    }
    this.accountService.save(this.account).subscribe((account: Account) => {
      this.updateBirthDate();
      this.router.navigate(['/account', 'edit', account.id]);
      this.globalEventsManager.showMessage("Account updated successfully !!");
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


