import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shopState, User} from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopserviceService {

  
  // define the subjects
  state: shopState = {
    
    shops: []
  };

  userState : User

  stateSubject: BehaviorSubject<shopState> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private authService: AuthService
  ) { }

  async init () {

    const result: any = await this.http.get(environment.url + 'order/get')
    .toPromise();

    if (result.data) {

      this.state.shops = result.data;
      this.stateSubject.next(this.state);
    }else {
      this.state.shops = [];
      this.stateSubject.next(this.state);
    }
  }


  
//ALERTS

errorMessage(a): void {
  this.snack.open(a, '',

  {
    duration: 5000,
    verticalPosition: 'bottom',
    panelClass: 'danger-alert'
  }

  ) ;
}

successMessage(a): void{
  this.snack.open(a, '',

  {
    duration: 3000,
    verticalPosition: 'top',
    panelClass: 'success-alert'
  }

  );
}

}
