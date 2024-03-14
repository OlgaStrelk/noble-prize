import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './page.module.css';
import personStyles from './person-page.module.css';
import PersonInfo from '../components/person-info';
import { Breadcrumbs } from '../components/breadcrumbs';
import { isContainRoute } from '../services/breadcrumbs';

import { loadLaureates } from '../services/api';

export const PersonPage = () => {
  const [person, setPerson] = useState(null);
  const { personId } = useParams();
  const { state, pathname } = useLocation();
  const url = window.location.href;
  const navigate = useNavigate();

  const loadLaureateInfo = useCallback(
    () => {
      loadLaureates().then(laureates => {
        setPerson(laureates.find(({ id }) => id === personId));
      });
    },
    [personId]
  );

  useEffect(
    () => {
      loadLaureateInfo();
    },
    [personId, loadLaureateInfo]
  );

  useEffect(
    () => {
      if (person && person.firstname && person.surname && state && !isContainRoute(state, url)) {
        const personBreadcrumb = { path: pathname, url, title: `${person.firstname} ${person.surname}` };
        navigate('', { state: [...state, personBreadcrumb], replace: true });
      }
    },
    [person, pathname, url, state]
  );

  return (
    <div className={personStyles.wrapper}>
      <div className={styles.container}>
        <Breadcrumbs />
        {person ? <PersonInfo person={person} /> : null}
      </div>
    </div>
  );
};