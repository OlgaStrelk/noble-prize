import { getCookie } from './utils';
import { TCountry, TLaureate, TRawUser } from './types/data';

export const deserializeQuery = (query: string, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
  const array = pairs.map(elem => elem.split('='));
  return Object.fromEntries(array);
};

export const serializeQuery = (queryParams: Record<string, string>) =>
  Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
    if (typeof value === 'undefined') {
      return acc;
    }
    const postfix = index === array.length - 1 ? '' : '&';
    return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
  }, '?');

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}

export const getCountriesRequest = async (): Promise<
  TResponseBody<'countries', ReadonlyArray<TCountry>>
  > =>
  await fetch('https://cosmic.nomoreparties.space/api/countries', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(res => res.json())
    .then(data => data);

export const getLaureatesRequest = async (): Promise<
  TResponseBody<'laureates', ReadonlyArray<TLaureate>>
  > =>
  await fetch('https://cosmic.nomoreparties.space/api/laureates', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(res => res.json())
    .then(data => data);

export const loginRequest = async (form: {
  email: string;
  password: string;
}): Promise<CustomResponse<TResponseBody<'user', TRawUser>>> =>
  await fetch('https://cosmic.nomoreparties.space/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });

export const getUserRequest = async (): Promise<CustomResponse<TResponseBody<'user', TRawUser>>> =>
  await fetch('https://cosmic.nomoreparties.space/api/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

export const logoutRequest = async (): Promise<CustomResponse<TResponseBody>> =>
  await fetch('https://cosmic.nomoreparties.space/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });