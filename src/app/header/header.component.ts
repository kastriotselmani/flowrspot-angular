import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { tap, take } from 'rxjs/operators';
import { AuthToken } from '../models/authToken';
import { AuthManagerService } from '../services/auth-manager.service';
import { UserResponse } from '../models/userReponse';
import { User } from '../models/user';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public registerUser = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    date_of_birth: ['', [Validators.required]],
  });
  public isAuthenticated: boolean = false;
  public userDetailsData: User | undefined;
  public isRegisteredSuccessfully : boolean = false;
  public isLoginSuccessfully : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private authManager: AuthManagerService
  ) {
    this.refreshToken();
  }

  ngOnInit(): void {
    this.authManager.isAuthenticated
      .pipe(
        tap((res: boolean) => {
          this.isAuthenticated = res;
          if(this.isAuthenticated)
            this.getUserDataDetails();
            this.isLoginSuccessfully = false;
        })
      )
      .subscribe();
  }

  openLoginModal(isRegistering: boolean | undefined) {
    if(isRegistering){
      $('#loginModal').modal('show');
      $('#registerModal').modal('hide');
    }
    else{
      $('#loginModal').modal('show');
    }
  }

  closeLoginModal() {
    $('#loginModal').modal('hide');
  }

  openRegisterModal() {
    $('#registerModal').modal('show');
  }

  closeRegisterModal() {
    $('#registerModal').modal('hide');
  }

  openUserDetailsModal(isLoggin : boolean | undefined) {
    if(isLoggin){
    $('#userDetailModal').modal('show');
    $('#loginModal').modal('hide');
    }
  }

  closeUserDetailsModal() {
    $('#userDetailModal').modal('hide');
  }

  login() {
    this.auth
      .login(this.user.value)
      .pipe(
        take(1),
        tap((res: AuthToken) => {
            this.authManager.setJwt(res.auth_token);
            this.authManager.isAuthenticated.next(true);
            this.isLoginSuccessfully = true;
        })
      )
      .subscribe();
  }

  register() {
    this.auth
      .register(this.registerUser.value)
      .pipe(
        take(1),
        tap((res: AuthToken) => {
          // this.authManager.setJwt(res.auth_token);
          // this.authManager.isAuthenticated.next(true);
          this.isRegisteredSuccessfully = true;
        })
      )
      .subscribe();
  }

  getUserDataDetails() {
    this.auth
      .getLoggedInUserData()
      .pipe(
        take(1),
        tap((res: UserResponse) => {
          this.userDetailsData = res.user;
        })
      )
      .subscribe();
  }

  refreshToken() {
    this.auth
      .refreshJwt()
      .pipe(
        take(1),
        tap((res: AuthToken) => {
          this.authManager.setJwt(res.auth_token);
          this.authManager.isAuthenticated.next(true);
        })
      )
      .subscribe();
  }

  logout() {
    $('#userDetailModal').modal('hide');
    this.authManager.removeJwt();
  }

}
