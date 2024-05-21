import React, { FC } from 'react';
import sorting from '../../images/sorting.svg';
import styles from './sorting-control.module.css';
import { SortingDirection } from '../../pages/list';

export const SortingControl: FC<{ label: string; onSort(): void; value: string }> = ({
  label,
  onSort,
  value
}) => {
  return (
    <div className={styles.container} onClick={onSort}>
      <div className={styles.selected_wrapper}>
        <p className={styles.selected}>
          <span>{label}</span>
        </p>
        <img
          src={sorting}
          alt={`sorting-direction: ${value}`}
          style={{ transform: value.toLowerCase() === SortingDirection.ASC ? 'rotate(180deg)' : '' }}
        />
      </div>
    </div>
  );
};