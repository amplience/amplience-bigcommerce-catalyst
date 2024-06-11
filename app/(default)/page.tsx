/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { ReadonlyURLSearchParams } from 'next/navigation';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';

const HOMEPAGE_DELIVERY_KEY = String(process.env.AMPLIENCE_HOMEPAGE_DELIVERY_KEY);

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

interface FlexibleSlot extends DefaultContentBody {
  slots: Array<{ id: string }>;
}

interface Slot extends DefaultContentBody {
  content: DefaultContentBody;
}

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));

  try {
    const flexibleSlot = (
      await amplienceClient.getContentItemByKey(HOMEPAGE_DELIVERY_KEY)
    ).toJSON() as FlexibleSlot;
    const allItemIds: string[] = flexibleSlot.slots.map((slot) => slot.id);
    const allItems = await amplienceClient.getContentItemsById<Slot>(allItemIds);

    return (
      <>
        {allItems.responses.map((item, index: number) => {
          return <AmplienceContent content={item.content} key={index} />;
        })}
      </>
    );
  } catch (e) {
    console.error(`Unable to load content item by key: ${HOMEPAGE_DELIVERY_KEY}`);
  }
}

export const runtime = 'edge';
