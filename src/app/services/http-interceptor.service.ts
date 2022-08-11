import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthManagerService } from './auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthManagerService, private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: this.auth.getJwt() ?? ''
      }
    });

    return next.handle(request).pipe(
      retry(0),
      catchError((e) => this._handleError(e))
    );
  }


  private _handleError(output: HttpErrorResponse) {
    if (output.status === 400) {
      this.toastr.error('Error', output.error.error)
    }
    if (output.status === 401) {
      this.auth.removeJwt();
      this.auth.isAuthenticated.next(false);
    }
    return new Observable<any>();

  }
}
