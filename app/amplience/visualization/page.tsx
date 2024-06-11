/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { ReadonlyURLSearchParams } from 'next/navigation';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import RealtimeVisualization from '~/components/amplience/realtime-visualization/realtime-visualization';

export interface VisualizationProps {
  searchParams: ReadonlyURLSearchParams & { contentId: string };
}

export default async function Visualization({ searchParams }: VisualizationProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));
  const { contentId } = searchParams;

  try {
    const content = (
      await amplienceClient.getContentItemById(contentId)
    ).toJSON() as DefaultContentBody;

    return (
      <div>
        <RealtimeVisualization content={content} />
      </div>
    );
  } catch (e) {
    return (
      <div>
        <p>Content not found...</p>
      </div>
    );
  }
}

export const runtime = 'edge';

export const fetchCache = 'force-no-store';
