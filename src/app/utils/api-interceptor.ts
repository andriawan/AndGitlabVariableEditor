import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, of, switchMap, take, throwError } from "rxjs";
import { GitlabTokenService } from "../services/gitlab-token.service";
import { GitlabVariableService } from "../services/gitlab-variable.service";
import { GitlabToken } from "../interfaces/gitlab-token";
import { Router } from "@angular/router";


@Injectable()
export class ApiInterceptor implements HttpInterceptor{
    AUTH_HEADER = 'Authorization';
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private tokenService: GitlabTokenService,
        private router: Router,
        private gitlabVarServie: GitlabVariableService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        )
                    } else {
                        this.refreshTokenInProgress = true;
                        this.refreshTokenSubject.next(null);
                        return this.refreshAccessToken().pipe(
                            switchMap((data: GitlabToken) => {
                                this.tokenService.clearToken();
                                this.tokenService.setToken(data);
                                this.refreshTokenSubject.next(true);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            catchError((errorFinal: HttpErrorResponse) => { 
                                this.router.navigate(['/'])
                                return throwError(() => new Error(errorFinal.message));
                            }),
                            finalize(() => this.refreshTokenInProgress = false)
                        );
                        
                    }
                } else {
                    return throwError(() => error.message);
                }
            })
        )
    }

    private refreshAccessToken(): Observable<GitlabToken> {
        return this.gitlabVarServie.refreshToken(this.tokenService.getTokenSync().refresh_token)
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        let token = this.tokenService.getTokenSync().access_token;
        if (!token) {
           return request;
        }
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, "Bearer " + token)
        });
    }
}
