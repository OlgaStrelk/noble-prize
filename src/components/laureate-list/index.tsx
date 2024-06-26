import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './laureate-list.module.css';

import Avatar from '../avatar';
import { Prizes } from './prizes';
import { TLaureate } from '../../services/types/data';

const LaureateList: React.FC<{ laureates: ReadonlyArray<TLaureate> }> = ({ laureates }) => {
  const { state } = useLocation();

  return laureates.length > 0 ? (
    <ul>
      {laureates.map(({ id, firstname, surname, prizes }) => (
        <li key={id}>
          <Link to={`${id}`} state={state} className={styles.link}>
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