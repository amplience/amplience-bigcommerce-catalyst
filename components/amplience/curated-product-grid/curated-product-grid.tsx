import { ProductCardCarousel } from '~/components/product-card-carousel';

interface CuratedProductGridProps {
  header: string;
  products: string[];
}

const CuratedProductGrid = async ({ header, products }: CuratedProductGridProps) => {
  const prods = await fetch(`http://localhost:3000/api/products/${products.join(',')}`).then((res) => res.json());

  return (
    <ProductCardCarousel
      products={prods}
      showCart={false}
      showCompare={false}
      showReviews={false}
      title={header}
    />
  );
};

export default CuratedProductGrid;
