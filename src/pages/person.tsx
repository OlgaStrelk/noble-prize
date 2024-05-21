import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './page.module.css';
import personPageStyles from './person-page.module.css';
import PersonInfo from '../components/person-info';
import { Breadcrumbs } from '../components/breadcrumbs';
import { isContainRoute } from '../services/breadcrumbs';
import { useDispatch, useSelector } from '../services/hooks';
import { getLaureatesThunk } from '../services/actions/laureates';
import {TLaureate} from '../services/types/data';

export const PersonPage = () => {
  const dispatch = useDispatch();
  const { laureates, laureatesRequest } = useSelector(state => state.laureates);

  const { personId } = useParams();
  const { state, pathname } = useLocation();
  const url = window.location.href;
  const navigate = useNavigate();
  const [person, setPerson] = useState<TLaureate>();

  useEffect(() => setPerson(laureates.find(({ id }) => id === personId)), [personId, laureates]);

  useEffect(
    () => {
      dispatch(getLaureatesThunk());
    },
    [personId, dispatch]
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
    <div className={personPageStyles.wrapper}>
      <div className={styles.container}>
        <Breadcrumbs />
        {!laureatesRequest && person ? <PersonInfo person={person} /> : null}
      </div>
    </div>
  );
};