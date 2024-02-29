'use client';

import { useEffect, useState } from 'react';

import { Product } from '~/components/product-card';
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface DynamicProductGridProps {
  limit: number;
  category: string;
}

const DynamicProductGrid = ({ limit = 10, category }: DynamicProductGridProps) => {
  const hostname = `http://localhost:3000`;
  const [hydratedProducts, setHydratedProducts] = useState<Array<Partial<Product>>>([]);

  useEffect(() => {
    const load = async () => {
      if (category) {
        const response = await fetch(`${hostname}/api/products-in-category/${category}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const allProducts = await response.json();
        const products = Array.isArray(allProducts) ? allProducts.slice(0, limit) : [];

        setHydratedProducts(products);
      }
    };

    void load();
  }, [category, hostname, limit]);

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
