'use client';

import { useState, useEffect } from 'react';

import styles from './CustomCocktailDetail.module.scss';

import CustomCocktailDeleteButton from '../CustomCocktailDeleteButton';
import CustomCocktailModifyButton from '../CustomCocktailModifyButton';
import memberStore from '@/store/memberStore';

// import memberStore from '@/store/memberStore';

interface Props {
  customId: number;
  originId: number;
  authorId: number;
}

export default function CustomCocktailDetailButtonArea({
  customId,
  originId,
  authorId,
}: Props) {
  const [isAuthor, setIsAuthor] = useState(false);
  const { id } = memberStore();

  useEffect(() => {
    if (authorId === id) {
      setIsAuthor(true);
    }
  }, [authorId, id]);

  return (
    <div>
      {isAuthor && (
        <div className={styles.buttons}>
          <div className={styles.button}>
            <CustomCocktailModifyButton customId={customId} />
          </div>
          <div className={styles['divide-line']}>|</div>
          <div className={styles.button}>
            <CustomCocktailDeleteButton
              customId={customId}
              cocktailId={originId}
            />
          </div>
        </div>
      )}

      {!isAuthor && <div />}
    </div>
  );
}
