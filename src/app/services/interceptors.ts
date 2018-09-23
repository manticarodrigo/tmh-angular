import { Injectable } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
} from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';

import { UserService } from './user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthToken();
 
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const headers = authToken ? 
      req.headers.set('Authorization', authToken) :
      req.headers.delete('Authorization');
    const authReq = req.clone({ headers });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

}
 
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
 
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          console.log(msg);
        })
      );
  }
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];