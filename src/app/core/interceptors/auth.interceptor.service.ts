import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')['token']
      : undefined;

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
        // .set("Accept-Version", environment.API_VERSION),
      });
      return next.handle(cloned).pipe(
        finalize(() => console.log()),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let displayError = '';
          let serverError = '';
          let clientError = '';

          if (error.error instanceof ErrorEvent) {
            // client-side error
            clientError = `Error: ${error.error.message}`;
            console.log('دسترسی امکان پذیر نمی باشد');
          } else {
            // server-side error
            displayError = error.error;
            serverError = `Error Code: ${error.status}\n${error.message}\n${
              error.error
            }\n${JSON.stringify(error.headers)}\n${error.type}`;

            if (error.status === 401) {
              console.log('خطا در مجوز دسترسی');
              this.router.navigate(['/']);
            } else if (error.status === 403) console.log('خطا در مجوز دسترسی');
            else if (error.status === 404)
              console.log('مشکل در ارتباط با سرور');
            else if (error.status >= 500) console.log('خطایی پیش آمده');
            else if (error.status >= 429)
              console.log('تعداد درخواست ها ارسالی بیش از حد مجاز است');
            else console.log('خطایی پیش آمده  ...');
          }
          return throwError(error);
        })
      );
    } else {
      const cloned = req.clone({
        headers: req.headers.set('Accept-Version', '1.0.0'),
      });
      return next.handle(cloned).pipe(
        finalize(() => console.log()),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let displayError = '';
          let serverError = '';
          let clientError = '';

          if (error.error instanceof ErrorEvent) {
            // client-side error
            clientError = `Error: ${error.error.message}`;
            console.log('دسترسی امکان پذیر نمی باشد');
          } else {
            // server-side error
            displayError = error.error;
            serverError = `Error Code: ${error.status}\n${error.message}\n${
              error.error
            }\n${JSON.stringify(error.headers)}\n${error.type}`;

            if (error.status === 401) {
              console.log('خطا در مجوز دسترسی');
              this.router.navigate(['/']);
            } else if (error.status === 403) console.log('خطا در مجوز دسترسی');
            else if (error.status === 404)
              console.log('مشکل در ارتباط با سرور');
            else if (error.status >= 500)
              console.log(
                'مشکل در ارتباط با سرور چند لحظه دیگر دوباره تلاش نمایید'
              );
            else if (error.status >= 429)
              console.log('تعداد درخواست ها ارسالی بیش از حد مجاز است');
            else console.log('خطا در ارتباط با سرور');
          }
          return throwError(error);
        })
      );
    }
  }
}
