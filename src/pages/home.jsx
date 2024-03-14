import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './home.module.css';

import { Button } from '../components/button';

export function HomePage() {
  const navigate = useNavigate();

  const onClick = (event) => {
    const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    navigate('/list', { state: initialBreadcrumb });
    event.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.heading}>Nobel Prize Library</h1>
          <Button primary={true} onClick={onClick}>
            View catalog
          </Button>
        </form>
        <p>1901-2020</p>
      </div>
    </div>
  );
}