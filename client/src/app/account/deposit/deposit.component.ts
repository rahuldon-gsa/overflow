import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from "@angular/forms";

@Component({
  selector: 'account-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  //depositForm: FormGroup = null;
  amount = new FormControl(null, Validators.required);

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        console.log("Got Property :: " + params['id']);
      }
    });

    /* this.depositForm = new FormGroup({
       'amount': new FormControl(null, Validators.minLength(3))
     });
     */
    // Create Form Component 

    this.amount.valueChanges.subscribe(value => {
      // do something with value here
      console.log("Amount is Number :: " + Number(value));

      const reg = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
      console.log("Amount :: " + value + " regex " + reg.test(value));

      if (value && !reg.test(value)) {
        this.amount.setErrors({ "notDecimal": true });
      }

      //this.amount.
      if (isNaN(value)) {
        this.amount.setErrors({ "notNumber": true });
      }

      this.amount.markAsDirty();
      this.amount.markAsTouched();
      //this.amount.updateValueAndValidity();
      //this.amount.invalid;

    });

  }

  depositAmount(){
    alert("Amount deposit");
  }

}
