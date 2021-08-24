import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productState, User } from 'src/assets/config/interfaces';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  // define the subjects
  state: productState = {
    
    products: []
  };

  userState : User

  stateSubject: BehaviorSubject<productState> = new BehaviorSubject(this.state);
  readonly stateObservable = this.stateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private authService: AuthService
  ) { }

  async init () {

    const productsResult: any = await this.http.get(environment.url + 'blog/get')
    .toPromise();
    const imagesResult: any = await this.http.get(environment.url + 'image/get')
    .toPromise();

    
    const theProducts = productsResult.data.filter(product => Number(product.state) !== 2 && Number(product.type) === 0);

      theProducts.forEach(product => {
        product.images = imagesResult.data.filter(image => image.blog === product.id);
      });
    
      this.state.products = theProducts;
      this.stateSubject.next(this.state);
    

  }

// New product

async saveProduct(product): Promise<any[]>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = product
  
  const result : any = await  this.http.post(environment.url + 'blog/register', 
  JSON.stringify(body), 
  options)
  .toPromise()
  
  return result
}


async saveEvent(event): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = event
  
  return this.http.post(environment.url + 'event/register', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.init();
      this.successMessage ("Evenement créee!");
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

// New images

async saveImages(images): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = images
  
  return this.http.post(environment.url + 'image/register', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
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


// Edit product

async editProduct(product): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = product
  
  
  return this.http.put(environment.url + 'blog/update', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.init();
      this.successMessage ("Succès !");
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


// Delete product

async deleteProduct(product): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = product
  
  
  return this.http.put(environment.url + 'blog/delete', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
      this.init();
      this.successMessage ("Succès !");
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

// Delete image

async deleteImage(image): Promise<boolean>  {

  
  let headers= new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  let options = {
    headers : headers
  }

  const body = image
  
  
  return this.http.put(environment.url + 'image/delete', 
  JSON.stringify(body), 
  options)
  .toPromise()
  .then(async (res: any) => {
    if(res.status) {
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


