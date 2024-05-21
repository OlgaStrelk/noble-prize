import React, { memo, useState, FC } from 'react';

import styles from './prizes.module.css';
import { TPrize } from '../../../services/types/data';

const Prize = ({ category, motivation, year, index }: Partial<TPrize> & { index?: number }) => (
  <>
    {index !== undefined && (<p className={styles.label}>Prize #{index + 1}</p>)}
    <p className={styles.info}>
      <span>Category: </span>The Nobel Prize in {category} {year}
    </p>
    <p className={styles.info}>
      <span>Prize motivation: </span>
      {motivation}
    </p>
  </>
);

export const Prizes: FC<{ prizes: ReadonlyArray<TPrize> }> = memo(({ prizes }) => {
  const [showPrizes, setShowPrizes] = useState(false);

  const openPrizes = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault();
    setShowPrizes(!showPrizes);
  };

  return prizes.length > 1 ? (
    <div className={styles.wrapper}>
      {showPrizes ? prizes.map((prize, index) => <Prize {...prize} key={index} index={index} />) : <Prize {...prizes[0]} />}
      <p className={styles.more} onClick={openPrizes}>
        {showPrizes ? 'Show less' : `Show +${prizes.length - 1} more prizes`}
      </p>
    </div>
  ) : (
    <Prize {...prizes[0]} />
  );
});