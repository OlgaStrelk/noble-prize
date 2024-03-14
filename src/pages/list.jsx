import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './page.module.css';

import { CountryList } from '../components/country-list';
import { SortingControl } from '../components/sorting-control';
import { deserializeQuery, loadCountries, loadLaureates, serializeQuery } from '../services/api';

export const ASC = 'asc';
export const DESC = 'desc';

const sortCb = (countrySorting, personCountSorting) => {
  if (countrySorting) {
    if (countrySorting === ASC) {
      return (a, b) => a.name.localeCompare(b.name);
    } else {
      return (a, b) => b.name.localeCompare(a.name);
    }
  }

  if (personCountSorting) {
    if (personCountSorting === ASC) {
      return (a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0);
    } else {
      return (a, b) => (b.count > a.count ? -1 : b.count < a.count ? 1 : 0);
    }
  }
};

const aggregateData = (acc, person) => {
  return {
    ...acc,
    [person.bornCountryCode]: acc[person.bornCountryCode]
      ? [...acc[person.bornCountryCode], person]
      : [person]
  };
};

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countrySorting, setCountrySorting] = useState(ASC);
  const [personCountSorting, setPersonCountSorting] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const loadCountryInfo = async () => {
    setLoading(true);
    try {
      const countries = await loadCountries();
      const laureates = await loadLaureates();

      const hashLaureates = laureates.reduce(aggregateData, {});

      const normalizedData = countries
        .map(({ code, name }) => ({
          code,
          name,
          count: (hashLaureates[code] && hashLaureates[code].length) || 0
        }))
        .sort(sortCb(countrySorting, personCountSorting));
      setData(normalizedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('country')) {
      setCountrySorting(searchParams.get('country'));
      setPersonCountSorting('');
    } else if (searchParams.get('count')) {
      setPersonCountSorting(searchParams.get('count'));
      setCountrySorting('');
    }
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(
    () => {
      loadCountryInfo();
    },
    [countrySorting, personCountSorting]
  );

  const content = loading ? (
    'loading'
  ) : data && data.length ? (
    <CountryList countries={data} />
  ) : null;

  const sortCountries = useCallback(
    type => {
      let nextSortingValue;
      switch (type) {
        case 'country': {
          nextSortingValue = countrySorting ? (countrySorting === ASC ? DESC : ASC) : ASC;
          break;
        }
        case 'count': {
          nextSortingValue = personCountSorting
            ? personCountSorting === ASC
              ? DESC
              : ASC
            : ASC;
          break;
        }
        default: {
          break;
        }
      }

      setSearchParams({[type]: nextSortingValue});
    },
    [personCountSorting, countrySorting]
  );

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
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