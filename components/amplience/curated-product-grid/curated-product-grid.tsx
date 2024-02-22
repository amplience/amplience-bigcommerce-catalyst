// import { getProducts } from '~/client/queries/get-products';
// import { ProductCardCarousel } from '~/components/product-card-carousel';

// interface CuratedProductGridProps {
//   header: string;
//   products: string[];
// }

// const CuratedProductGrid = async ({ header, products }: CuratedProductGridProps) => {
//   const productIds = products.map((item) => Number(item));
//   const prods = await getProducts({
//     productIds,
//     first: productIds.length,
//   });

//   return (
//     <ProductCardCarousel
//       products={prods}
//       showCart={false}
//       showCompare={false}
//       showReviews={false}
//       title={header}
//     />
//   );
// };

const CuratedProductGrid = () => {
  return <p>CuratedProductGrid</p>;
};

export default CuratedProductGrid;
