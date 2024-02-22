import { getContentById } from '~/amplience-client/queries/get-content-by-id';
import { getContentByKey } from '~/amplience-client/queries/get-content-by-key';
import { getBestSellingProducts } from '~/client/queries/get-best-selling-products';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';

const SIMPLE_BANNER_ID = '1210a3f6-99a2-46d2-9275-79553b71327c';
const SIMPLE_BANNER_KEY = 'content/simple-banner-1';
const FLEXIBLE_SLOT_KEY = 'slot/flexible-slot-1';

export default async function Home() {
  const [bestSellingProducts, featuredProducts, simpleBanner, simpleBannerKey, flexibleSlot] = await Promise.all([
    getBestSellingProducts({ imageWidth: 500, imageHeight: 500 }),
    getFeaturedProducts({ imageWidth: 500, imageHeight: 500 }),
    getContentById(SIMPLE_BANNER_ID),
    getContentByKey(SIMPLE_BANNER_KEY),
    getContentByKey(FLEXIBLE_SLOT_KEY),
  ]);

  return (
    <>
      <Hero />
      <h1>Simple banner by ID</h1>
      {
        simpleBanner && 
        <AmplienceContent content={simpleBanner} />
      }
      <h1>Simple banner by Key</h1>
      {
        simpleBannerKey && 
        <AmplienceContent content={simpleBannerKey} />
      }
      <h1>Flexible Slot by Key</h1>
      {
        flexibleSlot && 
        <AmplienceContent content={flexibleSlot} />
      }
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
