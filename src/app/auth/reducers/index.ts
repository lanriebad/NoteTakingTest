import {createReducer, on} from '@ngrx/store';
import {AuthActions} from "../auth.actions";

export const authFeatureKey = 'auth';

export interface User {
  roleId: string | number,
  email: string,
  username: string
}

export interface AuthState {
  accessToken: string,
  refreshToken: string,
  user: User | null
}

const initialAuthState: AuthState = {
  accessToken: '',
  refreshToken: '',
  user: null
};

export const reducers = createReducer(
  initialAuthState,

  on(AuthActions.loginSuccess, (state: AuthState, action) => {
    return {
      ...state,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      user: action.user
    };
  }),

  on(AuthActions.logOut, (state: any, action) => {
    return {
      ...state,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      user: action.user
    };
  })
);


