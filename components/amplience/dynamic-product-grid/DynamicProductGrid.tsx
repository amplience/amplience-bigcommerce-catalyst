import { getCategory } from '~/client/queries/get-category';
import { ProductCardCarousel } from '~/components/product-card-carousel';

type DynamicProductGridProps = {
  limit: number;
  category: string;
};

const DynamicProductGrid = async ({limit, category}: DynamicProductGridProps) => {

  const categoryId = Number.parseInt(category);
  const cat = await getCategory({
    categoryId: categoryId,
  });
  let products = cat?.products?.items as any[];
  if (limit) products = products.slice(0, limit);

  return (
    <>
      {cat && (
        <ProductCardCarousel
          products={cat?.products?.items as any[]}
          showCart={false}
          showCompare={false}
          showReviews={false}
          title={''}
        />
      )}
    </>
  );
};

export default DynamicProductGrid;
