import {Component, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Register} from './register';
import {RegisterService} from './register.service';

@Component({
  selector: 'register-image-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class RegisterImageComponent{
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}