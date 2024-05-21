import { TUser } from '../types/data';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILED,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS
} from '../constants';
import { TUserActions } from '../actions/user';

export type TUserState = {
  user?: TUser;
  loginRequest: boolean;
  loginRequestFailed: boolean;
  logoutRequest: boolean;
  logoutRequestFailed: boolean;
  userRequest: boolean;
  userRequestFailed: boolean;
};

const userInitialState: TUserState = {
  loginRequest: false,
  loginRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  userRequest: false,
  userRequestFailed: false,
  user: undefined
};

export const userReducer = (state = userInitialState, action: any): TUserState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true, loginRequestFailed: false };
    }
    case LOGIN_REQUEST_FAILED: {
      return { ...state, loginRequest: false, loginRequestFailed: true };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return { ...state, loginRequest: false, user: action.user };
    }
    case LOGOUT_REQUEST: {
      return { ...state, loginRequest: true, logoutRequestFailed: false };
    }
    case LOGOUT_REQUEST_FAILED: {
      return { ...state, logoutRequestFailed: true, logoutRequest: false };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return { ...state, user: undefined, logoutRequest: false };
    }
    case USER_REQUEST: {
      return { ...state, userRequest: true, userRequestFailed: false };
    }
    case USER_REQUEST_FAILED: {
      return { ...state, userRequest: false, userRequestFailed: true };
    }
    case USER_REQUEST_SUCCESS: {
      return { ...state, user: action.user, userRequest: false };
    }
    default: {
      return state;
    }
  }
};