import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from './country.module.css';
import arrow from '../../images/arrow.svg';
import { TCountryWithLaureatesCount } from '../../pages/list';

export const CountryList: React.FC<{ countries: ReadonlyArray<TCountryWithLaureatesCount> }> = ({
  countries
}) => {
  const { state } = useLocation();

  return (
    <ul>
      {countries.map(({ name, code, count }, index) => (
        <li key={index}>
          <Link
            to={`/list/${code}`}
            state={state}
            className={styles.link}
          >
            <div className={styles.country}>
              <div className={styles.info}>
                <span>{name}</span>
              </div>
              <div className={styles.info}>
                <span>{count}</span>
                <img src={arrow} alt="arrow" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};