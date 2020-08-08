import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators"; 

declare var require: any 

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.headers.has('skip-interceptor')) {
            const headers = request.headers.delete('skip-interceptor');
            return next.handle(request.clone({ headers }));
        }

        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            let token = user.token;
            if (token) {
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            }
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('content-type', 'text/plain') });

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';               
                if (errorMessage != '') {                     
                    return throwError(errorMessage);
                }
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log(event);                    
                }
                return event;
            })
        );
    }
}