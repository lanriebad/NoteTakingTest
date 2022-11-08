import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector, INIT,
  MetaReducer, UPDATE
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {

};

// export const hydrationMetaReducer = (
//   reducer: ActionReducer<AppState>
// ): ActionReducer<AppState> => {
//   return (state, action) => {
//     if (action.type === INIT || action.type === UPDATE) {
//       const storageValue = localStorage.getItem("state");
//       if (storageValue) {
//         try {
//           return JSON.parse(storageValue);
//         } catch {
//           localStorage.removeItem("state");
//         }
//       }
//     }
//     const nextState = reducer(state, action);
//     localStorage.setItem("state", JSON.stringify(nextState));
//     return nextState;
//   };
// };


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];



