'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useEffect, useState } from 'react';
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface DynamicProductGridProps {
  limit: number;
  category: string;
}

const DynamicProductGrid = ({ limit, category }: DynamicProductGridProps) => {
  const hostname = `http://localhost:3000`;
  const [hydratedProducts, setHydratedProducts] = useState<any[]>([]);

  useEffect(() => {
      const load = async () => {
      if (category) {
        let prods = await fetch(`${hostname}/api/products-in-category/${category}`).then((res) => res.json());
        if (limit) {
          prods = prods.slice(0, limit);
        }
        setHydratedProducts(prods);
      }
    }
    load();
  }, [category, limit]);

  return (
    <ProductCardCarousel
      products={hydratedProducts}
      showCart={false}
      showCompare={false}
      showReviews={false}
      title=""
    />
  );
};

export default DynamicProductGrid;
