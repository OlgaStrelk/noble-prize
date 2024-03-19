import { getCookie } from "./utils";

const BASE_URL = "https://cosmic.nomoreparties.space/";

export const deserializeQuery = (query, noQuestionMark = false) => {
  const pairs = (noQuestionMark ? query : query.substring(1)).split("&");
  const array = pairs.map((elem) => elem.split("="));
  return Object.fromEntries(array);
};

export const serializeQuery = (queryParams) =>
  Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
    if (typeof value === "undefined") {
      return acc;
    }
    const postfix = index === array.length - 1 ? "" : "&";
    return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}${postfix}`;
  }, "?");

export const getCountriesRequest = async () =>
  await fetch(`${BASE_URL}api/countries`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.json())
    .then(({ countries }) => countries);

export const getLaureatesRequest = async () =>
  await fetch(`${BASE_URL}api/laureates`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.json())
    .then(({ laureates }) => laureates);

export const getUserRequest = async () =>
  await fetch(`${BASE_URL}api/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

export const loginRequest = async (form) => {
  return await fetch(`${BASE_URL}login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};
