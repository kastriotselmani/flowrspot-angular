import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../models/authToken';
import { LoginDto } from '../models/loginDto';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { RegisterDto } from '../models/registerDto';
import { UserResponse } from '../models/userReponse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(loginDto: LoginDto) : Observable<AuthToken> {
    const path = environment.apiUrl + 'users/login';
    return this.httpClient.post<AuthToken>(path, loginDto);
  }

  register(registerDto: RegisterDto) : Observable<AuthToken> {
    const path = environment.apiUrl + 'users/register';
    return this.httpClient.post<AuthToken>(path, registerDto);
  }

  refreshJwt() : Observable<AuthToken> {
    const path = environment.apiUrl + 'users/me/refresh';
    return this.httpClient.get<AuthToken>(path);
  }

  getLoggedInUserData() : Observable<UserResponse> {
    const path = environment.apiUrl + 'users/me';
    return this.httpClient.get<UserResponse>(path);
  }
}
