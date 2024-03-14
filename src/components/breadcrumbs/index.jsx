import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import styles from './breadcrumbs.module.css';

import { removeRemainingCrumbs } from '../../services/breadcrumbs';

const Crumb = ({ url, title, path }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const routeTo = event => {
    event.preventDefault();
    navigate(path, { replace: true, state: removeRemainingCrumbs(state, url) });
  };

  return (
    <span className={styles.item}>
      <a href={url} onClick={routeTo}>
        {title}
      </a>
      {` > `}
    </span>
  );
};

const Breadcrumbs = () => {
  const { state } = useLocation();
  if (state) {
    return (
      <nav>
        {state.map(crumb => (
          <Crumb {...crumb} key={crumb.url} />
        ))}
      </nav>
    );
  }
  return null;
};

export { Breadcrumbs };