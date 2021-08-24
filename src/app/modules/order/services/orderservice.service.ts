import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { orderState, User} from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  // define the subjects
  state: orderState = {
    
    orders: []
  };

  userState : User

  stateSubject: BehaviorSubject<orderState> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private authService: AuthService
  ) { }

  async init () {

    const result: any = await this.http.get(environment.url + 'don/get')
    .toPromise();

    if (result.data) {

      this.state.orders = result.data;
      this.stateSubject.next(this.state);
    }else {
      this.state.orders = [];
      this.stateSubject.next(this.state);
    }
  }


  // Edit order

async editOrder(order): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = order
  
  return this.http.put(environment.url + 'order/update', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.init();
      this.successMessage ("Commande mise à jour !");
      return true;
    }
    else
    this.errorMessage('Une erreur est survenue, veuillez réessayer.')
      return false;
      
  }).catch(err => {
    this.errorMessage('Une erreur est survenue, veuillez réessayer.')
    return false;
    
  });

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
