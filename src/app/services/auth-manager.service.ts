import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthManagerService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor() {}

  removeJwt() {
    localStorage.removeItem(environment.auth_token);
    this.isAuthenticated.next(false);
  }

  getJwt() {
    return localStorage.getItem(environment.auth_token);
  }

  setJwt(token: string) {
    localStorage.setItem(environment.auth_token, token);
  }
}
