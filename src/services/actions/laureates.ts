import {
  LAUREATES_REQUEST,
  LAUREATES_REQUEST_FAILED,
  LAUREATES_REQUEST_SUCCESS,
} from "../constants";
import { TLaureate } from "../types/data";
import { getLaureatesRequest } from "../api";
import { AppThunkAction } from "../types";

export interface IGetLaureatesAction {
  readonly type: typeof LAUREATES_REQUEST;
}

export interface IGetLaureatesFailedAction {
  readonly type: typeof LAUREATES_REQUEST_FAILED;
}

export interface IGetLaureatesSuccessAction {
  readonly type: typeof LAUREATES_REQUEST_SUCCESS;
  readonly laureates: readonly TLaureate[];
}

export type TLaureatesActions =
  | IGetLaureatesAction
  | IGetLaureatesFailedAction
  | IGetLaureatesSuccessAction;

export const getLaureatesAction = (): IGetLaureatesAction => ({
  type: LAUREATES_REQUEST,
});

export const getLaureatesFailedAction = (): IGetLaureatesFailedAction => ({
  type: LAUREATES_REQUEST_FAILED,
});

export const getLaureatesSuccessAction = (
  laureates: ReadonlyArray<TLaureate>
): IGetLaureatesSuccessAction => ({
  type: LAUREATES_REQUEST_SUCCESS,
  laureates,
});

export const getLaureatesThunk = (): AppThunkAction => (dispatch: any) => {
  dispatch(getLaureatesAction());
  getLaureatesRequest().then((res) => {
    if (res && res.success) {
      dispatch(getLaureatesSuccessAction(res.laureates));
    } else {
      dispatch(getLaureatesFailedAction());
    }
  });
};
