import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthToken } from '../models/authToken';
import { LoginDto } from '../models/loginDto';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should login a user", () => {
    const authLoginObject: LoginDto = {
      username: 'kastroselmanii@gmail.com',
      password: 'kastro123'
    };
    const authToken: AuthToken = {
      auth_token: 'testAuthToken'
    };
    service.login(authLoginObject)
      .pipe(
        take(1),
        tap(res => {
          expect(res).toEqual(authToken)
        })
      ).subscribe();
      const testRequest = httpTestingController.expectOne('https://flowrspot-api.herokuapp.com/api/v1/users/login');
      testRequest.flush(authToken);
  });
});
