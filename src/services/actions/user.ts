import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILED,
  USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILED
} from '../constants';
import { TUser } from '../types/data';

export interface IGetUserAction {
  readonly type: typeof USER_REQUEST;
}

export interface IGetUserFailedAction {}

export interface IGetUserSuccessAction {
  readonly type: any;
  readonly user: any;
}

export interface ILoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginFailedAction {}

export interface ILoginSuccessAction {
  readonly type: any;
  readonly user: any;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export type TUserActions = any;

export const loginAction = (): ILoginAction => ({
  type: LOGIN_REQUEST
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_REQUEST_FAILED
});

export const loginSuccessAction = (user: TUser): ILoginSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS,
  user
});

export const logoutAction = (): ILogoutAction => ({
  type: LOGOUT_REQUEST
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_REQUEST_FAILED
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_REQUEST_SUCCESS
});

export const getUserAction = (): IGetUserAction => ({
  type: USER_REQUEST
});

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: USER_REQUEST_FAILED
});

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: USER_REQUEST_SUCCESS,
  user
});