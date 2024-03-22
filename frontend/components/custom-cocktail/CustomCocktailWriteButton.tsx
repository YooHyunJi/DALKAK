'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import styles from './CustomCocktailWriteButton.module.scss';

export default function CustomCocktailWriteButton() {
  const cocktailName = 'Apple Martini';
  const router = useRouter();
  const alertPopup = () => {
    router.push('/cocktail/custom/write/1');
  };

  const goToBaseCocktail = () => {
    alert('추후 기반 칵테일 상세 페이지로 이동');
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.flex}>
          <button
            type="button"
            onClick={goToBaseCocktail}
            className={styles['cocktail-name']}
          >
            {cocktailName}
          </button>
          <span className={styles['after-name']}>
            &nbsp;를 활용한 다른 회원들의 색다른 레시피를 확인해보세요!
          </span>
        </h2>

        <button
          className={styles['custom-create-button']}
          type="button"
          onClick={alertPopup}
        >
          나만의 커스텀 레시피 만들기
        </button>
      </div>
      {/* <Image src={cocktails} alt="칵테일1" width={150} height={150} /> */}
    </div>
  );
}