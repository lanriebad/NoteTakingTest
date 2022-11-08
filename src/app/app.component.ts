import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthActions} from "./auth/auth.actions";
import {AppState} from "./reducers";
import {Router} from "@angular/router";
import {selectIsLoggedIn} from "./auth/auth.selectors";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notes';
  isLoggedIn: Observable<boolean> = of(false);

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.store.select(selectIsLoggedIn);
    const user: any = localStorage.getItem('user');
      if (user) {
        this.isLoggedIn = of(true);
        this.store.dispatch(AuthActions.loginSuccess(JSON.parse(user)));
        this.router.navigateByUrl('/notes');

      }
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.isLoggedIn = of(false);
    localStorage.clear();
    this.store.dispatch(AuthActions.logOut({accessToken: null, refreshToken: null, user: null}));
  }
}
