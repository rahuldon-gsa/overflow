import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";

import * as _ from "lodash";
import { Response } from "@angular/http";
import { Account } from '../account';
import { AccountService } from '../account.service';
import { GlobalEventsManager } from '../../shared/services/global-events-manager';

@Component({
  selector: 'account-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  @Input()
  currentBalance: any; // Getting data from parent component, we can get from service also, this will not update if balance update
  amount = new FormControl(null, Validators.required);

  storedAccount: Account;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private accountService: AccountService, private globalEventsManager: GlobalEventsManager) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        console.log("DepositComponent =  Got Property :: " + params['id']);
        this.accountService.get(+params['id']).subscribe((account: Account) => {
          this.storedAccount = account;
        });
      }
    });

    this.amount.valueChanges.subscribe(value => {
      // do something with value here
      console.log("Amount is Number :: " + Number(value));

      const reg = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
      console.log("Amount :: " + value + " regex " + reg.test(value));

      if (value && !reg.test(value)) {
        this.amount.setErrors({ "notDecimal": true });
      }

      if (isNaN(value)) {
        this.amount.setErrors({ "notNumber": true });
      }

      this.amount.markAsDirty();
      this.amount.markAsTouched();

    });

  }

  depositAmount() {
    this.storedAccount.balance = _.add(Number(this.storedAccount.balance), Number(this.amount.value));
    this.accountService.save(this.storedAccount).subscribe((account: Account) => {
      this.globalEventsManager.showMessage("Amount Deposited successfully !!");
      this.amount.setValue(null);
      this.amount.markAsUntouched();
    }, (res: Response) => {
      console.log("Error saving account for deposit :: " + res);
    });

  }

}
