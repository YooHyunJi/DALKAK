'use client';

import React from 'react';
import CustomCocktailCard from './CustomCocktailCard';
import styles from './CustomCocktailCardWrapper.module.scss';

interface Dummy {
  title: string;
  comment: string;
  author: string;
  imageLink: string;
}

interface Props {
  dummy: Dummy[];
}

export default function CustomCocktailList({ dummy }: Props) {
  return (
    <div>
      <div className={styles.container}>
        <ul className={styles['grid-container']}>
          {dummy.map((custom, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CustomCocktailCard key={index} custom={custom} />
          ))}
        </ul>
      </div>
    </div>
  );
}