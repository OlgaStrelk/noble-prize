import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./page.module.css";

import { CountryList } from "../components/country-list";
import { SortingControl } from "../components/sorting-control";
import {
  deserializeQuery,
  loadCountries,
  loadLaureates,
  serializeQuery,
} from "../services/api";

export const ASC = "asc";
export const DESC = "desc";

const sortCb = (personCountSorting) => {
  if (personCountSorting === ASC) {
    return (a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0);
  } else {
    return (a, b) => (b.count > a.count ? -1 : b.count < a.count ? 1 : 0);
  }
};

const aggregateData = (acc, person) => {
  return {
    ...acc,
    [person.bornCountryCode]: acc[person.bornCountryCode]
      ? [...acc[person.bornCountryCode], person]
      : [person],
  };
};

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [personCountSorting, setPersonCountSorting] = useState("");

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
          count: (hashLaureates[code] && hashLaureates[code].length) || 0,
        }))
        .sort(sortCb(personCountSorting));
      setData(normalizedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("count")) {
      setPersonCountSorting(searchParams.get("count"));
    }
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    loadCountryInfo();
    console.log(searchParams)
  }, [personCountSorting]);

  const content = loading ? (
    "loading"
  ) : data && data.length ? (
    <CountryList countries={data} />
  ) : null;

  const sortCountries = useCallback(
    (type) => {
      const nextSortingValue = personCountSorting
        ? personCountSorting === ASC
          ? DESC
          : ASC
        : ASC;
      setSearchParams({ [type]: nextSortingValue });
    },
    [personCountSorting]
  );

  return (
    <div className={styles.vertical_padding}>
      <header className={styles.horizontal_padding}>
        <h1>List of Nobel laureates</h1>
      </header>
      <div className={styles.filters}>
        <div className={styles.filter_item}>
          <SortingControl
            label={"Number of Nobel laureates"}
            value={personCountSorting}
            onSort={() => sortCountries("count")}
          />
        </div>
      </div>
      {content}
    </div>
  );
};
