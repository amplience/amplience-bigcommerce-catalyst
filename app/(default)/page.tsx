/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';

const FLEXIBLE_SLOT_KEY = String(process.env.AMPLIENCE_FLEXIBLE_SLOT_KEY);

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);
  const [flexibleSlot] = await Promise.all([
    (await amplienceClient.getContentItemByKey(FLEXIBLE_SLOT_KEY)).toJSON() as DefaultContentBody,
  ]);
  const allItemIds = flexibleSlot.slots.map((content: any) => content.id);
  const allItems = (await amplienceClient.getContentItemsById(allItemIds)).responses;

  return (
    <>
      {allItems.map((item: any, index: number) => {
        return <AmplienceContent content={item.content} key={index} />;
      })}
    </>
  );
  // return <AmplienceContent content={flexibleSlot} />;
}

export const runtime = 'edge';
