/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { ReadonlyURLSearchParams } from 'next/navigation';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import { getBestSellingProducts } from '~/client/queries/get-best-selling-products';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';

const HOMEPAGE_CONTENT = 'docs/story/simplebanner/banner1';

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));
  let homepageSlot;

  try {
    homepageSlot = (
      await amplienceClient.getContentItemByKey(HOMEPAGE_CONTENT)
    ).toJSON() as DefaultContentBody;
  } catch (e) {
    console.error(`Unable to load content item by key: ${HOMEPAGE_CONTENT}`);
  }

  const [bestSellingProducts, featuredProducts] = await Promise.all([
    getBestSellingProducts({ imageWidth: 500, imageHeight: 500 }),
    getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
  ]);

  return (
    <>
      <Hero />
      {homepageSlot && <AmplienceContent content={homepageSlot} />}
      <div className="my-10">
        <ProductCardCarousel
          products={featuredProducts}
          showCart={false}
          showCompare={false}
          showReviews={false}
          title="Featured products"
        />
        <ProductCardCarousel
          products={bestSellingProducts}
          showCart={false}
          showCompare={false}
          showReviews={false}
          title="Popular products"
        />
      </div>
    </>
  );
}

export const runtime = 'edge';
