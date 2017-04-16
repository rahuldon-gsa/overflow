import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import 'rxjs/add/operator/map'

@Injectable()
export class GlobalEventsManager {
  
    private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

    private _globalMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public globalMessageEmitter: Observable<string> = this._globalMessage.asObservable();

    constructor() {}

    showNavBar(ifShow: boolean) {
        this._showNavBar.next(ifShow);
    }

    showMessage(msg: string) {
        this._globalMessage.next(msg);
    } 
}