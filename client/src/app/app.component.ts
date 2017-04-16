import { Component } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { GlobalEventsManager } from './shared/services/global-events-manager';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private globalEventsManager: GlobalEventsManager, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {

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
  }
}
