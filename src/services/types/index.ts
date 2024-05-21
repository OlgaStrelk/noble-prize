import type { ThunkDispatch } from "redux-thunk";
import { store } from "../store";
import { TUserState } from "../reducers/user";
import { TLaureatesState } from "../reducers/laureates";
import { TCountriesState } from "../reducers/countries";
import { TCountriesActions } from "../actions/countries";
import { TLaureatesActions } from "../actions/laureates";
import { TUserActions } from "../actions/user";

type TApplicationActions = TCountriesActions | TLaureatesActions | TUserActions;
export type RootState = {
  user: TUserState;
  laureates: TLaureatesState;
  countries: TCountriesState;
};
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;
