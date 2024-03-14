import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./page.module.css";
import LaureateList from "../components/laureate-list";
import Dropdown from "../components/dropdown";
import { loadLaureates, loadCountries } from "../services/api";

const ALL = "all";

export const CountryPage = () => {
  const [laureates, setLaureates] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countryTitle, setCountryTitle] = useState("");

  const { country } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const loadFilters = (filteredLaureates) => {
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

  const loadCountryInfo = useCallback(() => {
    loadCountries().then((countries) => {
      const currentCountry = countries.find(({ code }) => code === country);
      setCountryTitle(
        currentCountry && currentCountry.name ? currentCountry.name : country
      );
    });
  }, [country]);

  const loadAllCountryLaureates = useCallback(() => {
    loadLaureates().then((laureates) => {
      const countryLaureates = laureates.filter(
        ({ bornCountryCode }) => bornCountryCode === country
      );
      setLaureates(countryLaureates);
      loadFilters(countryLaureates);
    });
  }, [country]);

  useEffect(() => {
    loadCountryInfo();
    loadAllCountryLaureates();
  }, [country, loadCountryInfo, loadAllCountryLaureates]);

  const filterLaureates = useCallback(
    (selectedYear, selectedCategory) => {
      loadLaureates().then((laureates) => {
        const countryLaureates = laureates.filter(
          ({ bornCountryCode }) => bornCountryCode === country
        );
        const isItemFits = (prizes) => {
          const isYearFits = (year) =>
            selectedYear && selectedYear !== ALL ? year === selectedYear : true;
          const isCategoryFits = (category) =>
            selectedCategory && selectedCategory !== ALL
              ? category === selectedCategory
              : true;
          return prizes;
        };

        const filteredLaureates = [];
        countryLaureates.forEach((laureate) => {
          if (isItemFits(laureate.prizes)) {
            filteredLaureates.push(laureate);
          }
        });

        setLaureates(filteredLaureates);
      });
    },
    [country]
  );

  useEffect(() => {
    filterLaureates(searchParams.get("year"), searchParams.get("category"));
  }, [searchParams, filterLaureates]);

  const changeParam = (type, value) => {


    const search = {};

    for (let entry of searchParams.entries()) {
      console.log('entry,', entry)
      search[entry[0]] = entry[1];
    }
    console.log('search,', search)
    setSearchParams({...search, [type]: value});
  };

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
        <h1>{countryTitle}</h1>
      </header>
      <div className={styles.filters}>
        <div className={styles.filter_item}>
          <Dropdown
            label="Year"
            options={yearOptions}
            handleOnSelect={(value) => changeParam("year", `${value || ALL}`)}
            selected={searchParams.get("year") || ALL}
          />
        </div>
        <div className={styles.filter_item}>
          <Dropdown
            label="Category"
            options={categoryOptions}
            handleOnSelect={(value) =>
              changeParam("category", `${value || ALL}`)
            }
            selected={searchParams.get("category") || ALL}
          />
        </div>
      </div>
      <LaureateList laureates={laureates} />
    </div>
  );
};
