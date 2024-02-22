/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
// import { getCategory } from '~/client/queries/get-category';
// import { ProductCardCarousel } from '~/components/product-card-carousel';

// interface DynamicProductGridProps {
//   limit: number;
//   category: string;
// }

// const DynamicProductGrid = async ({ limit, category }: DynamicProductGridProps) => {
//   const categoryId = Number(category);
//   const cat = await getCategory({
//     categoryId,
//   });
//   let products = cat?.products.items as any[];

//   if (limit) {
//     products = products.slice(0, limit);
//   }

//   return (
//     <ProductCardCarousel
//       products={products.items as any[]}
//       showCart={false}
//       showCompare={false}
//       showReviews={false}
//       title=""
//     />
//   );
// };

const DynamicProductGrid = () => {
  return <p>DynamicProductGrid</p>;
};

export default DynamicProductGrid;
