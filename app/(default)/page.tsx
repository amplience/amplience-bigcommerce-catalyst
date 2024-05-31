/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { Link } from '~/components/link';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';
const HOMEPAGE_DELIVERY_KEY = String(process.env.AMPLIENCE_HOMEPAGE_DELIVERY_KEY);
const BLOG_POST_DELIVERY_KEY = String(process.env.AMPLIENCE_BLOG_POST_DELIVERY_KEY);

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);
  const [flexibleSlot] = await Promise.all([
    (
      await amplienceClient.getContentItemByKey(HOMEPAGE_DELIVERY_KEY)
    ).toJSON() as DefaultContentBody,
  ]);
  const allItemIds: string[] = flexibleSlot.slots.map((content: any) => content.id);
  const allItems = await amplienceClient.getContentItemsById(allItemIds);

  return (
    <>
      {allItems &&
        allItems.responses &&
        allItems.responses.map((item: any, index: number) => {
          return <AmplienceContent content={item.content} key={index} />;
        })}
      <div
        style={{
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        <h2 className="mb-4 text-xl font-bold md:text-2xl">Sample Amplience Blog Post</h2>
        <Link href={`/blog/${BLOG_POST_DELIVERY_KEY}`}>
          Click here to see a sample Blog Post from Amplience
        </Link>
      </div>
    </>
  );
}

export const runtime = 'edge';
