import { getProducts } from '~/client/queries/get-products';
import { ProductCardCarousel } from '~/components/product-card-carousel';

type CuratedProductGridProps = {
  header: string;
  products: string[];
};

const CuratedProductGrid = async ({header, products}: CuratedProductGridProps) => {

  const productIds = products.map(item => Number.parseInt(item));
  const prods = await getProducts({
      productIds: productIds ?? [],
      first: productIds.length,
    });

  return (
    <>
      {prods && (
        <ProductCardCarousel
          products={prods}
          showCart={false}
          showCompare={false}
          showReviews={false}
          title={header}
        />
      )}
    </>
  );
};

export default CuratedProductGrid;
