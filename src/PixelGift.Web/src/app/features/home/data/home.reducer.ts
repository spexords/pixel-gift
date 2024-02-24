import { createReducer } from "@ngrx/store";

export interface HomeState {

}

export const initialState = {} as HomeState;

export const homeReducer = createReducer(
  initialState
)