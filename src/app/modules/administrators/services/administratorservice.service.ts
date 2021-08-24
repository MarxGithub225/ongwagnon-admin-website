import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { administratorState } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorserviceService {

 // define the subjects
 state: administratorState = {
  admins : []
};


stateSubject: BehaviorSubject<administratorState> = new BehaviorSubject(this.state);
readonly stateObservable = this.stateSubject.asObservable();

constructor(
  private http: HttpClient,
  private snack: MatSnackBar
) { }

async init () {

  const result: any = await this.http.get(environment.url + 'admin/get')
  .toPromise();

  if (result.data) {
    this.state.admins = result.data;
    this.stateSubject.next(this.state);
  }else {
    this.state.admins = [];
    this.stateSubject.next(this.state);
  }
  
}


// New administrator

async saveAdministrator(administrator): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = administrator
  
  return this.http.post(environment.url + 'admin/register', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
      
    if(res.status) {
      this.successMessage ("Administrateur enregistré avec succès !");
      this.init();
      return true;
    }
    else 
    {
      this.successMessage ("Administrateur enregistré avec succès !");
      this.init();
      return true;
    }
    
      
  }).catch(err => {
    this.successMessage ("Administrateur enregistré avec succès !");
    this.init();
    return true;
    
  });

}


// Edit administrator

async editAdministrator(administrator): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = administrator

  
  return this.http.put(environment.url + 'admin/update', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.successMessage ("Administrateur modifié avec succès !");
      this.init();
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

// Edit administrator password

async editPasswordAdministrator(administrator): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = administrator

  
  return this.http.put(environment.url + 'admin/updatePass', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.successMessage ("Réinitialisation réussie, Veuillez vérifier dans votre messagérie.");
      this.init();
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


// Delete administrator password

async deleteAdministrator(administrator): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = administrator

  
  return this.http.put(environment.url + 'admin/delete', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.successMessage ("Administrateur supprimé avec succès !");
      this.init();
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

