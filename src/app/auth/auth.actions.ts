import {createAction, props} from "@ngrx/store";
import {User} from "./reducers";

export const AuthActions = {
  login: createAction(
    '[Login Page] Login',
    props<{username: string, password: string}>()
  ),

  loginSuccess: createAction(
    '[Auth Effects] Login Success',
    props<{accessToken: string, refreshToken: string, user: User}>()
  ),

  loginError: createAction(
    '[Auth Effects] Login Error',
    props<{msg: string}>()
  ),

  autoSignIn: createAction(
    '[App Component] Auto Sign In',
    props<{accessToken: string, refreshToken: string, user: User}>()
  ),

  register: createAction(
    '[Register Page] Register',
    props<{email: string, username: string, password: string, name: string, surname: string}>()
  ),

  logOut: createAction(
    '[Top Navbar] Logout',
    props<{accessToken: null, refreshToken: null, user: null}>()
  )
}
