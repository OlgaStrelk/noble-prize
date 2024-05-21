import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './home.module.css';

import { useAuth } from '../services/auth';
import { Button } from '../components/button';

export function HomePage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const logout = useCallback(
    () => {
      auth.signOut().then(() => {
        navigate('/login', {replace: true});
      });
    },
    [auth, navigate]
  );

  const onClick = () => {
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    navigate('/list', { state: initialBreadcrumb });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.heading}>Nobel Prize Library</h1>
          <Button primary={true} onClick={onClick}>
            View catalog
          </Button>
          <Button onClick={logout}>Log out</Button>
        </form>
        <p>1901-2020</p>
      </div>
    </div>
  );
}