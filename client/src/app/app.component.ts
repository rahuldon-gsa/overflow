import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalEventsManager } from './shared/services/global-events-manager';
import { AuthenticationService } from "./shared/services/authentication.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  closeResult: string;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isTimeRunningOut: any;

  @ViewChild('modalTimeoutButton') timeoutModal: ElementRef;
  @ViewChild('modalTimeoutHideButton') timeoutModalHide: ElementRef;


  constructor(private authenticationService: AuthenticationService, private globalEventsManager: GlobalEventsManager,
    private toastyService: ToastyService, private toastyConfig: ToastyConfig, private idle: Idle, private keepalive: Keepalive) {

    this.toastyConfig.theme = 'material';

    this.globalEventsManager.globalMessageEmitter.subscribe((mode) => {

      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {

        // Add ToastData  
        var toastOptions: ToastOptions = {
          title: "Message !!",
          msg: mode,
          showClose: true,
          timeout: 5000,
          theme: 'material',
          onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
          },
          onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
          }
        };

        // Add see all possible types in one shot 
        this.toastyService.info(toastOptions);
      }
    });

    this.kickMeOut();
  }

  kickMeOut() {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(600);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      //this.idleState = 'No longer idle.';

      // This will disappear timeout modal box
      /*
        this.reset();      
        this.timeoutModalHide.nativeElement.click();
      */

    });
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out! Logging out for safety !!';
      this.timedOut = true;

      if (this.timedOut) {
        this.logoutCurrentUser();
      }

    });
    this.idle.onIdleStart.subscribe(() => {
      // this.idleState = 'You\'ve gone idle!'
    }
    );
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.isTimeRunningOut = true;
      this.idleState = 'You will time out in ' + countdown + ' seconds!';

      if (this.isTimeRunningOut && sessionStorage.getItem('userRole') != null) {
        // pop up modal component
        this.timeoutModal.nativeElement.click();
      } else {
        this.reset();
      }

    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(500);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    this.isTimeRunningOut = false;
  }


  logoutCurrentUser() {
    this.authenticationService.logout().subscribe(res => {
      location.reload();
      this.globalEventsManager.showMessage("User logged out due to session timeout !!");
    }
    );
  }
}
