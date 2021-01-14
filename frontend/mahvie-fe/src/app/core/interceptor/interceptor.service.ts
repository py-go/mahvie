import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoaderService } from '@services/loader.service';
import { AlertboxService } from '@services/alertbox.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private alertboxService: AlertboxService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // show loader
    this.loaderService.showLoader();

    // add authorization header with jwt token if available
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // hide loader
        event instanceof HttpResponse && this.loaderService.hideLoader();
        return event;
      }),
      catchError(this.handleAppError.bind(this))
    );
  }

  /**
   * Common HTTP error handler
   * @param error Error response from API
   */
  handleAppError(error: HttpErrorResponse): ObservableInput<any> {
    // hide loader
    this.loaderService.hideLoader();

    // general error message from API
    this.alertboxService.showAlert('error', error.error?.error || 'Server Error');

    return throwError(error);
  }
}
