'use client';

import { useEffect, useState } from 'react';
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface CuratedProductGridProps {
  header: string;
  products: string[];
}

const CuratedProductGrid = ({ header, products }: CuratedProductGridProps) => {
  const hostname = `http://localhost:3000`;
  const [hydratedProducts, setHydratedProducts] = useState<any[]>([]);
  
  useEffect(() => {
      const load = async () => {
      if (products?.length) {
        const prods = await fetch(`${hostname}/api/products/${products.join(',')}`).then((res) => res.json()); 
        setHydratedProducts(prods);
      }
    }
    load();
  }, [products]);

  return (
    <ProductCardCarousel
      products={hydratedProducts}
      showCart={false}
      showCompare={false}
      showReviews={false}
      title={header}
    />
  );
};

export default CuratedProductGrid;
