import { ReadonlyURLSearchParams } from 'next/navigation';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import RealtimeVisualization from '~/components/amplience/realtime-visualization/realtime-visualization';

export interface VisualizationProps {
  searchParams: ReadonlyURLSearchParams & { contentId: string };
}

export default async function Visualization({ searchParams }: VisualizationProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);
  const { contentId } = searchParams;
  const content = await amplienceClient.getContentItemById(contentId);

  return (
    <div>
      <RealtimeVisualization content={content} />
    </div>
  );
}

export const runtime = 'edge';

export const fetchCache = 'force-no-store';
