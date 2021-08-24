import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from 'src/assets/config/interfaces';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  // define the subjects
  state: State = {
    loading: true,
    user: null
  };
  stateSubject: BehaviorSubject<State> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private authService: AuthService
  ) { }

  private authInit() {
    this.authService.initialize();
    this.authService.userObservable.subscribe(user => this.state = {...this.state, user});
    setTimeout(() => {
      this.setLoading(false);
    }, 2000)
  }

  init() {
    this.authInit();
  }

  // functions related to the service
  public setLoading(status: Boolean) {
    this.state.loading = status;
    this.stateSubject.next(this.state);
  }
}
