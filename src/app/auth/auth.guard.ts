import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {first, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsLoggedIn} from "./auth.selectors";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.store.select(selectIsLoggedIn).pipe(first());
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/login');
    }
    return !!user;
  }
}
