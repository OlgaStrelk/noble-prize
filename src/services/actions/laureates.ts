import {
  LAUREATES_REQUEST,
  LAUREATES_REQUEST_FAILED,
  LAUREATES_REQUEST_SUCCESS
} from '../constants';
import { TLaureate } from '../types/data';
import { getLaureatesRequest } from '../api';

export interface IGetLaureatesAction {
  readonly type: typeof LAUREATES_REQUEST;
}

export interface IGetLaureatesFailedAction {}

export interface IGetLaureatesSuccessAction {
  readonly type: any;
  readonly laureates: any;
}

export type TLaureatesActions = any;

export const getLaureatesAction = (): IGetLaureatesAction => ({
  type: LAUREATES_REQUEST
});

export const getLaureatesFailedAction = (): IGetLaureatesFailedAction => ({
  type: LAUREATES_REQUEST_FAILED
});

export const getLaureatesSuccessAction = (
  laureates: ReadonlyArray<TLaureate>
): IGetLaureatesSuccessAction => ({
  type: LAUREATES_REQUEST_SUCCESS,
  laureates
});

export const getLaureatesThunk = (): any => (dispatch: any) => {
  dispatch(getLaureatesAction());
  getLaureatesRequest().then(res => {
    if (res && res.success) {
      dispatch(getLaureatesSuccessAction(res.laureates));
    } else {
      dispatch(getLaureatesFailedAction());
    }
  });
};