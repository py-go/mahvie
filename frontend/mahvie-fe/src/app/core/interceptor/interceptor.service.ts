import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoaderService } from '@services/loader.service';
import { AlertboxService } from '@services/alertbox.service';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private alertboxService: AlertboxService,
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // show loader
    this.loaderService.showLoader();

    return next.handle(this.setAuthToken(request)).pipe(
      // hide loader
      map((event: HttpEvent<any>) => {
        event instanceof HttpResponse && this.loaderService.hideLoader();
        return event;
      }),
      catchError(error => this.handleAppError(error, request, next))
    );
  }

  /**
   * Common HTTP error handler
   * @param error Error response from API
   */
  private handleAppError(
    error: any,
    request: HttpRequest<any>,
    next: HttpHandler,
    isSessionExpired = false
  ): ObservableInput<any> {
    // hide loader
    this.loaderService.hideLoader();
    // access token expired
    if (error.status === 401 && !isSessionExpired) return this.handle401Error(request, next);
    if (isSessionExpired) {
      this.alertboxService.showAlert('error', 'Session expired!');
      this.authService.logoutUser();
      this.router.navigateByUrl('/user/login');
    }
    else this.alertboxService.showAlert('error', this.extractErrorMessage(error));
    return throwError(error);
  }

  /**
   * Refresh access token on status 401 error
   */
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): ObservableInput<any> {
    return this.authService.refreshAccessToken().pipe(
      switchMap((response: any) => {
        this.authService.setAccessToken(response.access);
        return next.handle(this.setAuthToken(request));
      }),
      catchError(error => this.handleAppError(error, request, next, true))
    );
  }

  /**
   * Extract error message for notification
   * @param error Error response from API
   */
  private extractErrorMessage(error: any): string {
    if (error.error?.error) {
      return error.error.error;
    } else {
      const errorList = Object.keys(error).filter(key => Array.isArray(error[key]));
      return errorList.length ? errorList[0] : 'Server Error';
    }
  }

  /**
   * Append authorization token in request header if logged in
   */
  private setAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    this.authService.isUserLoggedIn()
      && (request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.getUserCredentails().access}`)
      }));
    return request;
  }
}
