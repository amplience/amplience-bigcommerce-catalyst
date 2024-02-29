'use client';

import { useEffect, useState } from 'react';

import { Product } from '~/components/product-card';
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface CuratedProductGridProps {
  header: string;
  products: string[];
}

const CuratedProductGrid = ({ header, products = [] }: CuratedProductGridProps) => {
  const hostname = `http://localhost:3000`;
  const [hydratedProducts, setHydratedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      if (products.length) {
        const response = await fetch(`${hostname}/api/products/${products.join(',')}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const responseProducts = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const allProducts: Product[] = Array.isArray(responseProducts) ? responseProducts : [];

        // products are NOT return in the order requested
        // reorder prods based on products order
        const orderedProducts: Product[] = [];

        products.forEach((productId) => {
          const foundProduct = allProducts.find(
            (product: Product) => product.entityId === Number(productId),
          );

          if (foundProduct) {
            orderedProducts.push(foundProduct);
          }
        });

        setHydratedProducts(orderedProducts);
      }
    };

    void load();
  }, [hostname, products]);

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
