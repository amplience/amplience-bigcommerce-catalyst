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

const SIMPLE_BANNER_ID = String(process.env.AMPLIENCE_SIMPLE_BANNER_ID);
const SIMPLE_BANNER_KEY = String(process.env.AMPLIENCE_SIMPLE_BANNER_KEY);
const FLEXIBLE_SLOT_KEY = String(process.env.AMPLIENCE_FLEXIBLE_SLOT_KEY);

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);
  const [bestSellingProducts, featuredProducts, simpleBanner, simpleBannerKey, flexibleSlot] =
    await Promise.all([
      getBestSellingProducts({ imageWidth: 500, imageHeight: 500 }),
      getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
      (await amplienceClient.getContentItemById(SIMPLE_BANNER_ID)).toJSON() as DefaultContentBody,
      (await amplienceClient.getContentItemByKey(SIMPLE_BANNER_KEY)).toJSON() as DefaultContentBody,
      (await amplienceClient.getContentItemByKey(FLEXIBLE_SLOT_KEY)).toJSON() as DefaultContentBody,
    ]);

  return (
    <>
      <Hero />
      <h1>Simple banner by ID</h1>
      <AmplienceContent content={simpleBanner} />
      <h1>Simple banner by Key</h1>
      <AmplienceContent content={simpleBannerKey} />
      <h1>Flexible Slot by Key</h1>
      <AmplienceContent content={flexibleSlot} />
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
