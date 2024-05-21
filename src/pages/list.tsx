import React, { useEffect, useState, useCallback } from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

import styles from './page.module.css';

import { CountryList } from '../components/country-list';
import { SortingControl } from '../components/sorting-control';
import { isContainRoute } from '../services/breadcrumbs';
import { Breadcrumbs } from '../components/breadcrumbs';
import { TCountry, TLaureate } from '../services/types/data';
import {
  deserializeQuery,
  serializeQuery
} from '../services/api';
import { useDispatch, useSelector } from '../services/hooks';
import {getLaureatesThunk} from "../services/actions/laureates";
import {getCountriesThunk} from "../services/actions/countries";

export enum SortingDirection {
  ASC = 'asc',
  DESC = 'desc',
  none = ''
}

export type TCountryWithLaureatesCount = TCountry & { count: number };

const sortCb = (countrySorting: SortingDirection, personCountSorting: SortingDirection) => {
  if (countrySorting) {
    if (countrySorting === SortingDirection.ASC) {
      return (a: TCountryWithLaureatesCount, b: TCountryWithLaureatesCount) =>
        a.name.localeCompare(b.name);
    } else {
      return (a: TCountryWithLaureatesCount, b: TCountryWithLaureatesCount) =>
        b.name.localeCompare(a.name);
    }
  }

  if (personCountSorting) {
    if (personCountSorting === SortingDirection.DESC) {
      return (a: TCountryWithLaureatesCount, b: TCountryWithLaureatesCount) =>
        a.count < b.count ? 1 : a.count > b.count ? -1 : 0;
    } else {
      return (a: TCountryWithLaureatesCount, b: TCountryWithLaureatesCount) =>
        b.count > a.count ? -1 : b.count < a.count ? 1 : 0;
    }
  }
};

const aggregateData = (acc: { [key: string]: ReadonlyArray<TLaureate> }, person: TLaureate) => {
  return {
    ...acc,
    [person.bornCountryCode]: acc[person.bornCountryCode]
      ? [...acc[person.bornCountryCode], person]
      : [person]
  };
};

export const ListPage = () => {
  const dispatch = useDispatch();
  const { laureates, laureatesRequest } = useSelector(state => state.laureates);
  const { countries, countriesRequest } = useSelector(state => state.countries);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  const [data, setData] = useState<Array<TCountryWithLaureatesCount>>([]);
  const [countrySorting, setCountrySorting] = useState<SortingDirection>(SortingDirection.ASC);
  const [personCountSorting, setPersonCountSorting] = useState<SortingDirection>(
    SortingDirection.none
  );

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate(pathname, { state: [...state, { path: pathname, url, title: 'List of Nobel laureates' }], replace: true });
      }
    },
    /* eslint-disable-next-line */
    [pathname, state, url]
  );

  useEffect(
    () => {
      dispatch(getLaureatesThunk());
      dispatch(getCountriesThunk());
    },
    [dispatch]
  );

  useEffect(
    () => {
      const hashLaureates = laureates.reduce(aggregateData, {});

      const normalizedData = countries
        .map(({ code, name }) => ({
          code,
          name,
          count: (hashLaureates[code] && hashLaureates[code].length) || 0
        }))
        .sort(sortCb(countrySorting, personCountSorting));
      setData(normalizedData);
    },
    [laureates, countries, personCountSorting, countrySorting]
  );

  useEffect(() => {
    if (search) {
      const queryObj = deserializeQuery(search);
      Object.keys(deserializeQuery(search)).forEach(key => {
        if (key === 'country') {
          setCountrySorting(queryObj[key]);
          setPersonCountSorting(SortingDirection.none);
        } else {
          setPersonCountSorting(queryObj[key]);
          setCountrySorting(SortingDirection.none);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const content =
    laureatesRequest || countriesRequest ? (
      'loading'
    ) : data && data.length ? (
      <CountryList countries={data} />
    ) : null;

  const getNextQuery = useCallback(
    (type: string, current: string) => {
      if (!search) {
        return `?${type}=${current}`;
      } else {
        return serializeQuery({ [type]: current });
      }
    },
    [search]
  );

  const sortCountries = useCallback(
    (type: string) => {
      let query;
      switch (type) {
        case 'country': {
          const nextSortingValue = countrySorting ? (countrySorting === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC) : SortingDirection.ASC;
          setCountrySorting(nextSortingValue);
          setPersonCountSorting(SortingDirection.none);
          query = getNextQuery(type, nextSortingValue);
          break;
        }
        case 'count': {
          const nextSortingValue = personCountSorting
            ? personCountSorting === SortingDirection.ASC
              ? SortingDirection.DESC
              : SortingDirection.ASC
            : SortingDirection.ASC;
          setPersonCountSorting(nextSortingValue);
          setCountrySorting(SortingDirection.none);
          query = getNextQuery(type, nextSortingValue);
          break;
        }
        default: {
          break;
        }
      }

      setSearchParams({search:  query ?? ''});
    },
    [personCountSorting, countrySorting, getNextQuery, setSearchParams]
  );

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
        <Breadcrumbs />
        <h1>List of Nobel laureates</h1>
      </header>
      <div className={styles.filters}>
        <div className={styles.filter_item}>
          <SortingControl
            label={'Country'}
            onSort={() => sortCountries('country')}
            value={countrySorting}
          />
        </div>
        <div className={styles.filter_item}>
          <SortingControl
            label={'Number of Nobel laureates'}
            value={personCountSorting}
            onSort={() => sortCountries('count')}
          />
        </div>
      </div>
      {content}
    </div>
  );
};