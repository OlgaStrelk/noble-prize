import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './laureate-list.module.css';

import Avatar from '../avatar';
import { Prizes } from './prizes';

const LaureateList = ({ laureates }) => {

  return laureates.length > 0 ? (
    <ul>
      {laureates.map(({ id, firstname, surname, prizes }) => (
        <li key={id}>
          <Link to={`${id}`} className={styles.link}>
            <Avatar firstname={firstname} surname={surname} className={styles.avatar} />
            <div>
              <h3>
                {firstname} {surname}
              </h3>
              <Prizes prizes={prizes} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.empty}>No results were found</p>
  );
};

export default LaureateList;