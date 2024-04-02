'use client';

import { Suspense, useEffect, useState } from 'react';
import styles from './refrigerator-recommend.module.scss';

import { ICocktailType } from '../../../type/searchTypes';
import Loading from '@/components/common/Loading';
import RecommendList from '@/components/store/RecommendList';

let zeroList: ICocktailType[] = [];
let nonZeroList: ICocktailType[] = [];

const authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE3MTE3ODk1MDgsImV4cCI6MTcxMjE0OTUwOCwiaWQiOjN9.rxVLMICLt23rj4vV_btj7QtObPgxszooG-rzQG_et3A';

const getRecommentResult = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recommends/refrigerator`,
    {
      headers: { authorization },
    },
  );
  const json = await res.json();
  return json.data;
};

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 비동기 작업 수행
        const recommendList = await getRecommentResult();
        zeroList = await recommendList.zero;
        nonZeroList = await recommendList.non_zero;
        // 데이터 처리
        // ...
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // fetchData 함수 호출
  }, []);

  return (
    <div>
      <Suspense
        fallback={
          <Loading
            text1="가지고 있는 재료로 만들 수 있는"
            text2="최적의 칵테일을 추천해드릴게요!"
          />
        }
      >
        {loading ? (
          <Loading
            text1="가지고 있는 재료로 만들 수 있는"
            text2="최적의 칵테일을 추천해드릴게요!"
          />
        ) : (
          <>
            <RecommendList
              title="내가 가진 재료들로 만들 수 있는 칵테일이에요"
              cocktailList={zeroList}
            />
            <div className={styles['divide-line']} />
            <RecommendList
              title="재료가 좀 더 있으면 이런 것도 가능해요!"
              cocktailList={nonZeroList}
            />
          </>
        )}
      </Suspense>
    </div>
  );
}
