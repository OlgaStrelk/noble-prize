import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './page.module.css';
import LaureateList from '../components/laureate-list';
import Dropdown from '../components/dropdown';
import { Breadcrumbs } from '../components/breadcrumbs';
import {
  getCountriesRequest,
  deserializeQuery,
  serializeQuery,
  getLaureatesRequest
} from '../services/api';
import { isContainRoute } from '../services/breadcrumbs';

const ALL = 'all';

export const CountryPage = () => {
  const [laureates, setLaureates] = useState([]);
  const [selectedYear, setSelectedYear] = useState(ALL);
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [yearOptions, setYearOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countryTitle, setCountryTitle] = useState('');

  const { country } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const { state, pathname } = useLocation();
  const url = window.location.href;
  const navigate = useNavigate();

  useEffect(
    () => {
      if (countryTitle && state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: countryTitle }], replace: true });
      }
    },
    [countryTitle, pathname, url, state]
  );

  const loadFilters = filteredLaureates => {
    const years = new Set();
    const categories = new Set();
    filteredLaureates.forEach(({ prizes }) => {
      prizes.forEach(({ year, category }) => {
        years.add(year);
        categories.add(category);
      });
    });
    setYearOptions([ALL, ...Array.from(years)]);
    setCategoryOptions([ALL, ...Array.from(categories)]);
  };

  const loadCountryInfo = useCallback(
    () => {
      getCountriesRequest().then(countries => {
        const currentCountry = countries.find(({ code }) => code === country);
        setCountryTitle(currentCountry && currentCountry.name ? currentCountry.name : country);
      });
    },
    [country]
  );

  const loadAllCountryLaureates = useCallback(
    () => {
      getLaureatesRequest().then(laureates => {
        const countryLaureates = laureates.filter(
          ({ bornCountryCode }) => bornCountryCode === country
        );
        setLaureates(countryLaureates);
        loadFilters(countryLaureates);
      });
    },
    [country]
  );

  useEffect(
    () => {
      loadCountryInfo();
      loadAllCountryLaureates();
    },
    [country, loadCountryInfo, loadAllCountryLaureates]
  );

  const filterLaureates = useCallback(
    (selectedYear, selectedCategory) => {
      getLaureatesRequest().then(laureates => {
        const countryLaureates = laureates.filter(
          ({ bornCountryCode }) => bornCountryCode === country
        );
        const isItemFits = prizes => {
          const isYearFits = year => (selectedYear ? year === selectedYear : true);
          const isCategoryFits = category =>
            selectedCategory ? category === selectedCategory : true;
          return prizes.some(({ year, category }) => isYearFits(year) && isCategoryFits(category));
        };

        const filteredLaureates = [];
        countryLaureates.forEach(laureate => {
          if (isItemFits(laureate.prizes)) {
            filteredLaureates.push(laureate);
          }
        });

        setLaureates(filteredLaureates);
      });
    },
    [country]
  );

  useEffect(
    () => {
      const params = deserializeQuery(search);

      setSelectedYear(`${params.year || ALL}`); // to string
      setSelectedCategory(params.category || ALL);
      filterLaureates(params.year, params.category);
    },
    [search, filterLaureates]
  );

  const filterItems = useCallback(
    (value, type) => {
      let query = search;

      const isAllItems = value.toLowerCase() === ALL;
      if (!search && !isAllItems) {
        query = `?${type}=${value}`;
      } else {
        let params = deserializeQuery(query);
        if (isAllItems) {
          if (params.hasOwnProperty(type)) {
            delete params[type];
          }
        } else {
          params = { ...params, [type]: value };
        }
        query = serializeQuery(params);
      }
      setSearchParams({
        search: query
      });
    },
    [search]
  );

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
        <Breadcrumbs />
        <h1>{countryTitle}</h1>
      </header>
      <div className={styles.filters}>
        <div className={styles.filter_item}>
          <Dropdown
            label="Year"
            options={yearOptions}
            handleOnSelect={value => filterItems(value, 'year')}
            selected={selectedYear}
          />
        </div>
        <div className={styles.filter_item}>
          <Dropdown
            label="Category"
            options={categoryOptions}
            handleOnSelect={value => filterItems(value, 'category')}
            selected={selectedCategory}
          />
        </div>
      </div>
      <LaureateList laureates={laureates} />
    </div>
  );
};