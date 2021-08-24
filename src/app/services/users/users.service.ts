import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userState, User } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // define the subjects
  state: userState = {
    
    users: []
  };

  userState : User

  stateSubject: BehaviorSubject<userState> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  async init () {

    const result: any = await this.http.get(environment.url + 'user/get')
    .toPromise();

    const today = new Date().getTime();
    if (result.data) {

      this.state.users = result.data;
      this.stateSubject.next(this.state);
    }else {
      this.state.users = [];
      this.stateSubject.next(this.state);
    }

    
  }
}
