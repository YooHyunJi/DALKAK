/* eslint-disable no-lonely-if */

'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import LockOutlined from '@mui/icons-material/LockOutlined';
import PublicOutlined from '@mui/icons-material/PublicOutlined';

import { useRouter } from 'next/navigation';

import styles from './CustomCocktailModify.module.scss';

import BtnWithIcon from '@/components/common/BtnWithIcon';
import CustomCocktailAddIngredientTest from '@/components/custom-cocktail/write/CustomCocktailAddIngredientTest';
import CustomCocktailAddRecipe from '@/components/custom-cocktail/write/CustomCocktailAddRecipe';
import CustomCocktailImageUpload from '@/components/custom-cocktail/write/CustomCocktailImageUpload';
import CustomCocktailInput from '@/components/custom-cocktail/write/CustomCocktailInput';
// import { error } from 'console';
// import { RepeatOneSharp } from '@mui/icons-material';

interface Unit {
  id: number;
  name: string;
}

// interface Custom_Ingredients {
//   id: number;
//   name: string;
//   image: string;
//   category_id: number;
//   ingredient_amount: number;
//   unit: Unit;
// }

const token = process.env.NEXT_PUBLIC_TOKEN;

interface CustomIngredientList {
  id: number;
  name: string;
  image: string;
  category_id: number;
  ingredient_amount?: number;
  amount?: number;
  unit: Unit;
}

// interface CustomModifyReqDto {
//   // cocktailId: number;
//   customName: string;
//   customSummary: string;
//   customComment: string;
//   customRecipe: string;
//   open: boolean;
//   customIngredientList: CustomIngredientList[];
// }

interface Props {
  customId: number;
}
export default function CustomCocktailModify(props: Props) {
  const { customId } = props;
  const router = useRouter();

  const [isPublic, setIsPublic] = useState(false);

  // const [ingredientData, setIngredientData] = useState<Custom_Ingredients[]>(
  //   [],
  // );

  const [uploadedImage, setUploadedImage] = useState('');

  // const [koreanName, setKoreanName] = useState('');
  const [name, setName] = useState('');

  // const [baseRecipe, setBaseRecipe] = useState('');

  // 여기선 유저가 보낼 데이터

  const [customName, setCustomName] = useState('');
  const [customSummary, setCustomSummary] = useState('');
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [customComment, setCustomComment] = useState('');
  const [customRecipe, setCustomRecipe] = useState('');
  const [open, setOpen] = useState(false);

  /** 이미지 변경 관련 */
  const handleImageProps = (targetImage: File | null) => {
    setCustomImage(targetImage);
  };

  // 재료추가 기능 관련

  const [tempList, setTempList] = useState<CustomIngredientList[]>([]);

  // const [customIngredientList, setCustomIngredientList] = useState<
  //   CustomIngredientList[]
  // >([]);

  // eslint-disable-next-line camelcase
  const filteredList = tempList.map(
    // eslint-disable-next-line camelcase
    ({ id, ingredient_amount, unit: { id: unitId } }) => ({
      id,
      // eslint-disable-next-line camelcase
      amount: ingredient_amount,
      // eslint-disable-next-line camelcase
      unit_id: unitId,
    }),
  );

  const [inputValues, setInputValues] = useState<number[]>([]);

  const [inputUnitValues, setInputUnitValues] = useState<string[]>([]);

  const [inputUnitValuesId, setInputUnitValuesId] = useState<number[]>([]);

  const confirmData = () => {
    // console.log('여기부터');
    console.log(customImage);
    console.log(customName);
    console.log(customSummary);
    console.log(customComment);
    console.log(customRecipe);
    console.log(open);
    console.log(tempList);
    console.log(filteredList);

    // console.log(uploadedImage);
  };

  const infoPlaceholder =
    '추가 설명이나 후기를 알려주세요.\n\n 이런 내용이 들어가면 좋아요!| 이 재료는 다른 걸로 대체할 수 있어요 | - 기존 레시피와 비교해서 맛이 이렇게 달라요 | - 이럴 때 마시는 걸 추천해요';

  //   eslint-disable-next-line no-shadow

  const getBaseData = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customs/${customId}`,
      {
        // 분명 같은 토큰인데 왜 어쩔때는 위에 코드가 안되고
        // 어쩔때는 아래 코드가 안 되는 건지 모르겠음...
        headers: {
          Authorization: token ? `${token}` : '',
          // Authorization: `${authorization}`,
        },
      },
    );

    if (!response.ok) {
      const error = new Error('Failed to fetch data');
      throw error;
    } else {
      const result = await response.json();

      const data = await result.data;

      setInputValues(
        data.custom_ingredients.map(
          (item: { ingredient_amount: number }) => item.ingredient_amount,
        ),
      );

      setInputUnitValues(
        data.custom_ingredients.map(
          (item: { unit: { name: string } }) => item.unit.name,
        ),
      );

      setInputUnitValuesId(
        data.custom_ingredients.map(
          (item: { unit: { id: number } }) => item.unit.id,
        ),
      );

      return data;
    }
  }, [customId]);

  useEffect(() => {
    const getBaseCocktailData = async () => {
      const response = await getBaseData();
      setName(await response.name);
      // setIngredientData(await response.custom_ingredients);
      // setCustomIngredientList(await response.custom_ingredients);
      setUploadedImage(await response.image);
      // setBaseRecipe(await response.recipe);
      setCustomRecipe(await response.recipe);
      setTempList(await response.custom_ingredients);
      setCustomName(await response.name);
      setCustomSummary(await response.summary);
      setCustomComment(await response.comment);
    };
    getBaseCocktailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTempList((prevTempList) => {
      const newTempList = prevTempList.map((item, index) => ({
        ...item,
        ingredient_amount: inputValues[index],
        unit: {
          ...item.unit,
          name: inputUnitValues[index],
          id: inputUnitValuesId[index],
        },
      }));
      return newTempList;
    });
  }, [inputValues, inputUnitValues, inputUnitValuesId]);

  const removeItem = (id: number) => {
    setTempList((prevList) => prevList.filter((data) => data.id !== id));
  };

  const handleInputChangeTest = (value: number, index: number[]) => {
    const tempNum = value;
    const indexToUpdate = index[0];
    setInputValues((prevInputValues) => {
      const newInputValues: number[] = [...prevInputValues];
      newInputValues[indexToUpdate] = tempNum;
      return newInputValues;
    });
  };

  const handleUnitInputChange = (
    e: ChangeEvent<HTMLSelectElement>,
    id: number,
    index: number[],
  ) => {
    const indexToUpdate = index[0];
    const unitValue = id;

    setInputUnitValuesId((prevUnitValuesId) => {
      const updatedUnitValuesId = [...prevUnitValuesId];
      updatedUnitValuesId[indexToUpdate] = unitValue;
      return updatedUnitValuesId;
    });
  };

  // eslint-disable-next-line no-shadow
  const splitedInfoPlaceholder = (infoPlaceholder: string) =>
    infoPlaceholder.split('|').join('\n');

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomComment(e.target.value);
  };

  const handleRecipeAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCustomRecipe(e.target.value);
    // setSplitedRecipe(e.target.value);
  };

  const handleInputChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 15) {
      e.target.value = e.target.value.slice(0, 15);
    }

    setCustomName(e.target.value);
  };

  const handleInputChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, 20);
    }

    setCustomSummary(e.target.value);
  };

  const handleIsPublic = () => {
    if (isPublic === false) {
      setIsPublic(true);
      setOpen(true);
    } else {
      setIsPublic(false);
      setOpen(false);
    }
  };

  // eslint-disable-next-line no-shadow
  const addItem = (id: number, name: string) => {
    if (tempList.length < 12) {
      const newItem = {
        id,
        name,
        ingredient_amount: 0,
        // amount: 0,
        image: '',
        category_id: 0,
        unit: {
          id: 1,
          name: '',
        },
      };
      // 중복 여부 확인
      const isDuplicate = tempList.some((item) => item.id === id);
      // 중복이 없을 경우에만 새로운 아이템 추가
      if (!isDuplicate) {
        setTempList((prevList) => [...prevList, newItem]);
      } else {
        // 중복된 아이템이 있다면 여기에 대한 처리를 추가할 수 있습니다.
        alert('이미 추가된 재료입니다');
      }
    } else {
      alert('재료는 최대 12개까지 추가할 수 있습니다.');
    }
  };

  const modifyCustomCocktail = async () => {
    try {
      if (
        customName &&
        customSummary &&
        customComment &&
        customRecipe &&
        customRecipe.trim() !== '' &&
        filteredList.length > 0
      ) {
        const postInput = {
          customName,
          customSummary,
          customComment,
          customRecipe,
          open: open ? 'True' : 'False',
          customIngredientList: filteredList,
        };

        const formData = new FormData();

        if (customImage !== null) {
          formData.append('image', customImage);
        } else {
          formData.append('image', '');
        }

        formData.append(
          'CustomModifyReqDto',
          new Blob([JSON.stringify(postInput)], { type: 'application/json' }),
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/customs/${customId}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: token ? `${token}` : '',
            },
            body: formData,
          },
        );
        if (response.ok) {
          alert('커스텀 레시피가 수정되었습니다.');
          console.log(formData);
          router.push(`/cocktail/custom/detail/${customId}`);
        } else {
          console.error('커스텀 레시피 수정 실패');
          console.log(formData);
        }
      } else {
        // if (!customImage) {
        //   alert('커스텀 칵테일 이미지를 업로드해주세요.');
        // } else

        if (!customName) {
          alert('커스텀 칵테일 이름을 작성해주세요.');
        } else if (!customSummary) {
          alert('커스텀 칵테일 한 줄 요약(summary)을 작성해주세요.');
        } else if (!customComment) {
          alert('커스텀 칵테일 간단한 설명(comment)를 작성해주세요.');
        } else if (!customRecipe || customRecipe.trim() === '') {
          alert('커스텀 칵테일 레시피를 작성해주세요.');
        } else if (filteredList.length < 1) {
          alert('커스텀 칵테일 재료를 추가해주세요.');
        }
      }
    } catch (error) {
      console.log('서버와 통신 중 오류 발생');
      console.log(error);
    }
  };
  return (
    <div className={styles['flex-container']}>
      <div className={styles.container}>
        <div className={styles['title-container']}>
          <div className={styles.name}>
            커스텀 칵테일 이름
            <span className={styles['divide-line']}>&nbsp;&nbsp;&nbsp;|</span>
          </div>

          <div className={styles.explain}>&nbsp;&nbsp; {name}</div>
          <div />

          <div className={styles.buttons}>
            <div className={`${styles.button} ${styles.button1}`}>
              <BtnWithIcon
                icon={isPublic ? PublicOutlined : LockOutlined}
                text={isPublic ? '전체 공개' : '나만 보기'}
                btnStyle="empty-dark"
                handleOnClick={handleIsPublic}
              />
            </div>
            <div className={`${styles.button} ${styles.button2}`}>
              <BtnWithIcon
                text="커스텀 칵테일 수정"
                btnStyle="full-point"
                handleOnClick={modifyCustomCocktail}
              />
            </div>
          </div>
        </div>
        <button type="button" onClick={confirmData}>
          저장된 데이터 확인
        </button>
        <div className={styles['inner-container']}>
          <div className={styles.space}>
            <CustomCocktailImageUpload
              handleImageProps={handleImageProps}
              uploadedImage={uploadedImage}
            />
            <div className={styles['input-container']}>
              <div className={styles.inputs}>
                <CustomCocktailInput
                  max={15}
                  placeText="커스텀 칵테일 이름을 입력해주세요"
                  // defaultValue={name}
                  inputValue={customName}
                  handleInputChange={handleInputChange1}
                />
              </div>
              <div className={styles.inputs}>
                <CustomCocktailInput
                  max={20}
                  placeText="기존 칵테일과 어떻게 다른가요?"
                  inputValue={customSummary}
                  handleInputChange={handleInputChange2}
                />
              </div>
              <div className={styles.inputs}>
                <textarea
                  className={styles['info-input']}
                  value={customComment}
                  placeholder={splitedInfoPlaceholder(infoPlaceholder)}
                  onChange={(e) => handleTextAreaChange(e)}
                />
              </div>
            </div>
          </div>
          <div className={styles.space}>
            {/* <CustomCocktailAddIngredient origin={ingredientData} /> */}
            <CustomCocktailAddIngredientTest
              // origin={customIngredientList}
              handleInputChangeTest={handleInputChangeTest}
              handleUnitInputChange={handleUnitInputChange}
              removeItem={removeItem}
              tempList={tempList}
              inputValues={inputValues}
              // inputUnitValues={inputUnitValues}
              inputUnitValuesId={inputUnitValuesId}
              addItem={addItem}
            />
            <CustomCocktailAddRecipe
              handleInputChange={handleRecipeAreaChange}
              inputValue={customRecipe}
              // recipe={baseRecipe}
              // customRecipe={customRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
