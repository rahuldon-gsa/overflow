import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from './account';
import { AccountService } from './account.service';
import { Response } from "@angular/http";
import * as _ from "lodash";
import { State } from '../shared/interfaces/state';

@Component({
  selector: 'account-persist',
  templateUrl: './account-persist.component.html'
})
export class AccountPersistComponent implements OnInit {

  stateJson  = require('../shared/data/states.json');
  account = new Account();
  create = true;
  errors: any[];
  incomeSources = ['Employment Income', 'Inheritance or Trust', 'Investment Income', 'Retirement Income', 'Social Security', 'Unemployment', 'Household Income']
  stateList = []; 

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.accountService.get(+params['id']).subscribe((account: Account) => {
          this.create = false;
          this.account = account;
        });
      }
    });
   
   let testt = _.toArray(this.stateJson);
   this.stateList = testt; 
  }
  
  lockAccount(){ 
    console.log("clicked : " + this.account.type);
  }

  save() {
    this.accountService.save(this.account).subscribe((account: Account) => {
      this.router.navigate(['/account', 'show', account.id]);
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


