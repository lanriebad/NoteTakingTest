import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from "./auth.service";
import {AuthActions} from "./auth.actions";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action => this.authService.login(action.username, action.password)),
      tap((response: any) => {
        if (response.responseCode === '00') {
          this.toastr.success(response.responseMsg);
          localStorage.setItem('user', JSON.stringify(response.responseData[0]));
          this.store.dispatch(AuthActions.loginSuccess({...response.responseData[0]}));
        } else {
          this.toastr.error(response.responseMsg || 'Operation Unsuccessful');
        }
      }),
      map(response => {
        if (response.responseCode === '00') {
          this.router.navigateByUrl('/notes');
        }
      }),
      catchError(() => of(AuthActions.loginError({msg: 'Error Logging In'}))),
    )
  }, {dispatch: false});

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(action => this.authService.register(action.email, action.username, action.password, action.name, action.surname)),
      tap(response => {
        if (response?.responseCode === '00') {
          const user = {
            user: response?.responseData?.[0]?.user,
            accessToken: response?.responseData?.[0]?.accessToken,
            refreshToken: response?.responseData?.[0]?.refreshToken
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('/notes')
        }
      }),
      map(response => AuthActions.loginSuccess({
        user: response?.responseData?.[0]?.user,
        accessToken: response?.responseData?.[0]?.accessToken,
        refreshToken: response?.responseData?.[0]?.refreshToken
      })),
    )
  });

  autoSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoSignIn),
      map(action => {
        const userDetails: any = localStorage.getItem('user');
        this.store.dispatch(AuthActions.loginSuccess(JSON.parse(userDetails)));
      })
    );
  }, {dispatch: false});

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => this.router.navigateByUrl('/login'))
    )
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private router: Router,
              private store: Store,
              private toastr: ToastrService,
              private authService: AuthService) {
  }

}
