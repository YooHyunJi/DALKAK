import CocktailDetail from '@/components/cocktail/CocktailDetail';
// import { ICocktailType } from '@/type/searchTypes';
// import { ICocktailType } from '@/type/searchTypes';

// export const dynamic = 'force-static';

// export const dynamicParams = false;
// const token = process.env.NEXT_PUBLIC_TOKEN;

// interface Unit {
//   id: number;
//   name: string;
// }

// interface Cocktail_Ingredients {
//   id: number;
//   name: string;
//   image: string;
//   category_id: number;
//   amount: number;
//   unit: Unit;
// }

// interface Cocktail_Tools {
//   id: number;
//   name: string;
//   image: string;
// }

// interface Custom_Cocktails {
//   id: number;
//   image: string;
//   name: string;
//   summary: string;
//   user: {
//     id: number;
//     nickname: string;
//   };
// }

// interface Data {
//   id: number;
//   name: string;
//   korean_name: string;
//   image: string;
//   heart_count: number;
//   view_count: number;
//   alcohol_content: number;
//   sweetness: number;
//   recipe: string;
//   cocktail_ingredients: Cocktail_Ingredients[];
//   cocktail_tools: Cocktail_Tools[];
//   custom_cocktails: Custom_Cocktails[];
// }

// interface ApiResponse {
//   code: number;
//   messages: string[];
//   data: Data;
// }

// eslint-disable-next-line consistent-return
// export async function generateStaticParams({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } = params;

//   return {
//     id: params.toString(),
//   };
// }

export default function Page({ params }: { params: { cocktailId: string } }) {
  const { cocktailId } = params;
  const cocktailIdInt = parseInt(cocktailId, 10);

  return (
    <div>
      <CocktailDetail cocktailId={cocktailIdInt} />
    </div>
  );
}

export async function generateStaticParams() {
  const staticParamList = [];
  for (let i = 1; i <= 3165; i += 1) {
    staticParamList.push({ cocktailId: i.toString() });
  }
  return staticParamList;
}
