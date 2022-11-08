import { createFeatureSelector, createSelector } from '@ngrx/store';
import {authFeatureKey, AuthState} from "./reducers";


const authFeatureSelector = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAccessToken = createSelector(
  authFeatureSelector,
  state => state.accessToken
);

export const selectIsLoggedIn = createSelector(
  authFeatureSelector,
  state => !!state?.user
);

