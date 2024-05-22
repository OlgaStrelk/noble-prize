import { TCountry } from '../types/data';
import {
  COUNTRIES_REQUEST,
  COUNTRIES_REQUEST_FAILED,
  COUNTRIES_REQUEST_SUCCESS
} from '../constants';
import { TCountriesActions } from '../actions/countries';

export type TCountriesState = {
  countries: ReadonlyArray<TCountry>;
  countriesRequest: boolean;
  countriesRequestFailed: boolean;
};

const countriesInitialState: TCountriesState = {
  countries: [],
  countriesRequest: false,
  countriesRequestFailed: false
};

export const countriesReducer = (state = countriesInitialState, action: TCountriesActions): TCountriesState => {
  switch (action.type) {
    case COUNTRIES_REQUEST: {
      return { ...state, countriesRequest: true, countriesRequestFailed: false };
    }
    case COUNTRIES_REQUEST_FAILED: {
      return { ...state, countriesRequest: false, countriesRequestFailed: true };
    }
    case COUNTRIES_REQUEST_SUCCESS: {
      return { ...state, countriesRequest: false, countries: action.countries };
    }
    default: {
      return state;
    }
  }
};