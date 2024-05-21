import styles from './button.module.css';
import React, { FC } from 'react';

type TButtonProps = {
  primary?: boolean;
  secondary?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<TButtonProps> = ({ primary, secondary, ...props }) => {
  return (
    <button {...props} className={primary ? styles.primary : styles.secondary}>
      {props.children}
    </button>
  );
};