import { createAmplienceClient } from '~/amplience-client';
import RealtimeVisualization from '~/components/amplience/realtime-visualization/realtime-visualization';

export interface VisualizationProps {
  searchParams: {
    hubName: string;
    locale: string;
    stagingEnvironment: string;
    contentId: string;
  };
}

export default async function Visualization({ searchParams }: VisualizationProps) {
  const { hubName, locale, stagingEnvironment, contentId } = searchParams;

  const amplienceClient = createAmplienceClient({ hubName, locale, stagingEnvironment });

  const content = await amplienceClient.getContentItemById(contentId);

  return <div>{content && <RealtimeVisualization content={content} />}</div>;
}

export const runtime = 'edge';
