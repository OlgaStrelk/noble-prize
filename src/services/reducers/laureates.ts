import { TLaureate } from '../types/data';
import {
  LAUREATES_REQUEST,
  LAUREATES_REQUEST_FAILED,
  LAUREATES_REQUEST_SUCCESS
} from '../constants';
import { TLaureatesActions } from '../actions/laureates';

export type TLaureatesState = {
  laureates: ReadonlyArray<TLaureate>;
  laureatesRequest: boolean;
  laureatesRequestFailed: boolean;
};

const laureatesInitialState: TLaureatesState = {
  laureates: [],
  laureatesRequest: false,
  laureatesRequestFailed: false
};

export const laureatesReducer = (state = laureatesInitialState, action: any): TLaureatesState => {
  switch (action.type) {
    case LAUREATES_REQUEST: {
      return { ...state, laureatesRequest: true, laureatesRequestFailed: false };
    }
    case LAUREATES_REQUEST_FAILED: {
      return { ...state, laureatesRequest: false, laureatesRequestFailed: true };
    }
    case LAUREATES_REQUEST_SUCCESS: {
      return { ...state, laureatesRequest: false, laureates: action.laureates };
    }
    default: {
      return state;
    }
  }
};