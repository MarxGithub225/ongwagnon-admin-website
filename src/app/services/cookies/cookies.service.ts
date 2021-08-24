import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }

  public get(name: string): string {
    return this.cookieService.get(name);
  }

  // register token
  public set(token: string): void {
    if (environment.production) {
      this.cookieService.set(
        environment.cookieName,
        token,
        new Date(new Date().getTime() + 5 * 60 * 60 * 24 * 1000),
        null,
        environment.domain,
        true,
        'Strict'
      );
    } else {
      this.cookieService.set(
        environment.cookieName,
        token,
        new Date(new Date().getTime() + 5 * 60 * 60 * 24 * 1000),
        null,
        environment.domain,
        false,
        'Strict'
      );
    }
  }

  // delete cookie
  public delete(): void {
    this.cookieService.delete(environment.cookieName);
  }
  
}
