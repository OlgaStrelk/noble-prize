import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import styles from './breadcrumbs.module.css';

import { removeRemainingCrumbs, TBreadCrumbsState } from '../../services/breadcrumbs';

const Crumb: React.FC<{ path: string; url: string; title: string }> = ({ path, url, title }) => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const routeTo = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(path, { replace: true, state: removeRemainingCrumbs(state, url) });
  };

  return (
    <span className={styles.item}>
      {path === pathname ? (
        title
      ) : (
        <>
          <a href={url} onClick={routeTo}>
            {title}
          </a>
          {` > `}
        </>
      )}
    </span>
  );
};

const Breadcrumbs = () => {
  const { state } = useLocation();
  if (state) {
    return (
      <nav>
        {state.map((crumb: TBreadCrumbsState[number]) => (
          <Crumb {...crumb} key={crumb.url} />
        ))}
      </nav>
    );
  }
  return null;
};

export { Breadcrumbs };