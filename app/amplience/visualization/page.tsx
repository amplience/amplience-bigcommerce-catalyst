import { createAmplienceClient } from '~/amplience-client';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';

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

  return <div>{content && <AmplienceContent content={content} />}</div>;
}

export const runtime = 'edge';
