import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './page.module.css';
import personStyles from './person-page.module.css';
import PersonInfo from '../components/person-info';
import { Breadcrumbs } from '../components/breadcrumbs';
import { isContainRoute } from '../services/breadcrumbs';

import { loadLaureates } from '../services/api';

export const PersonPage = () => {
  const [person, setPerson] = useState(null);
  const { personId } = useParams();

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

  return (
    <div className={personStyles.wrapper}>
      <div className={styles.container}>
        {person ? <PersonInfo person={person} /> : null}
      </div>
    </div>
  );
};