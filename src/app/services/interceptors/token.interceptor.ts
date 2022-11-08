import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectAccessToken} from "../../auth/auth.selectors";
import {AuthActions} from "../../auth/auth.actions";
import {AuthService} from "../../auth/auth.service";

@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private store: Store,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userDetails = localStorage.getItem('user');
    let accessToken = null;
    if (userDetails) {
      accessToken = JSON.parse(userDetails).accessToken ;
    }
    const request = accessToken ? req.clone({
      headers: req.headers.append('Authorization', `Bearer ${accessToken}`)
    }) : req.clone();

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(request, next);
          }
          return throwError(error);
        }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      let user: any = localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        const token = user?.refreshToken;
        return this.authService.getRefreshToken(token).pipe(
          switchMap(({accessToken, refreshToken}) => {
            this.isRefreshing = false;
            this.store.dispatch(AuthActions.loginSuccess({user, accessToken, refreshToken}))
            this.refreshTokenSubject.next(accessToken);
            const modRequest = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
            });
            return next.handle(modRequest);
          }),
          catchError((err) => {
            this.isRefreshing = false;
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject
      .pipe(
        filter((token: any) => token !== null),
        take(1),
        switchMap((token) => {
          let req = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          })
          return next.handle(req);
        })
      );
  }
}
