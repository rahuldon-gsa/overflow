import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './timeout-modal.component.html',
  styleUrls: ['./timeout-modal.component.css']
})
export class TimeoutModalComponent implements OnInit {

  visible = false;
  visibleAnimate = false;
 
  constructor(public elementRef: ElementRef){}
  ngOnInit() {
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    /*
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
    */
  }
}