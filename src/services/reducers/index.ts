import { combineReducers } from 'redux';
import { userReducer } from './user';
import { laureatesReducer } from './laureates';
import { countriesReducer } from './countries';

export const rootReducer = combineReducers({
  user: userReducer,
  laureates: laureatesReducer,
  countries: countriesReducer
});