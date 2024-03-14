import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./country.module.css";

export const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map(({ name, code, count }, index) => (
        <li key={index}>
          <Link className={styles.link} to={`/list/${code}`}>
            <div className={styles.country}>
              <div className={styles.info}>
                <span>{name}</span>
              </div>
              <div className={styles.info}>
                <span>{count}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
