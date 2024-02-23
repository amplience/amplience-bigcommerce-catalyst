/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface DynamicProductGridProps {
  limit: number;
  category: string;
}

const DynamicProductGrid = async ({ limit, category }: DynamicProductGridProps) => {
  let prods = await fetch(`http://localhost:3000/api/products-in-category/${category}`).then((res) => res.json());

  if (limit) {
    prods = prods.slice(0, limit);
  }

  return (
    <ProductCardCarousel
      products={prods}
      showCart={false}
      showCompare={false}
      showReviews={false}
      title=""
    />
  );
};

export default DynamicProductGrid;
