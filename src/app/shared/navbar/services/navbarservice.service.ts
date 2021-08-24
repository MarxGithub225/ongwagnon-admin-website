import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { navbarState } from 'src/assets/config/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarserviceService {

  private state: navbarState = {
    userSideActive: false,
  };

  private stateSubject: BehaviorSubject<navbarState> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor() { }

  setUserSide (status: Boolean) {

    this.state.userSideActive = status;
    this.stateSubject.next(this.state);
  }

}
