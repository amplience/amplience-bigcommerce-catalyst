'use client';

import { useEffect, useState } from 'react';
import { Product } from '~/components/product-card';
import { ProductCardCarousel } from '~/components/product-card-carousel';

interface CuratedProductGridProps {
  header: string;
  products: string[];
}

const CuratedProductGrid = ({ header, products }: CuratedProductGridProps) => {
  const hostname = `http://localhost:3000`;
  const [hydratedProducts, setHydratedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
      const load = async () => {
      if (products?.length) {

        // products are NOT return in the order requested
        // reorder prods based on products order
        let prods = await fetch(`${hostname}/api/products/${products.join(',')}`).then((res) => res.json()); 
        prods = products.map((productId) => { return prods.find((product: Product) => product.entityId == Number(productId))});

        // alternate solution, multiple requests in the right order
        // const prods: Product[]= await Promise.all(
        //   products.map(async (productId) => {
        //     const res = await fetch(`${hostname}/api/product/${productId}`);
        //     return await res.json();
        //   })
        // );

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
