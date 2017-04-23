import { Component , ViewChild, ElementRef} from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalEventsManager } from './shared/services/global-events-manager';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {

closeResult: string;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

 @ViewChild('modalTimeout') timeoutModal:ElementRef;

  constructor( private modalService: NgbModal, private globalEventsManager: GlobalEventsManager, private toastyService: ToastyService, private toastyConfig: ToastyConfig, private idle: Idle, private keepalive: Keepalive) {

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
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // pop up modal component
      this.timeoutModal.nativeElement.click();
    });
    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  clickMethod(name: string) {
  if(alert("Are you sure to delete "+name)) {
    console.log("Implement delete functionality here");
  }
}


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
