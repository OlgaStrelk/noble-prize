import React, {ChangeEvent, useCallback, useState, MouseEvent} from 'react';
import { Navigate } from 'react-router-dom';

import styles from './home.module.css';
import { useAuth } from '../services/auth';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { PasswordInput } from '../components/password-input';

export function LoginPage() {
  let auth = useAuth();

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      auth.signIn(form);
    },
    [auth, form]
  );

  if (auth.user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.heading}>Nobel Prize Library</h1>
          <Input placeholder="Email" value={form.email} name="email" onChange={onChange} />
          <PasswordInput
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={onChange}
          />
          <Button onClick={login} primary={true}>
            Log in
          </Button>
        </form>
        <p>1901-2020</p>
      </div>
    </div>
  );
}