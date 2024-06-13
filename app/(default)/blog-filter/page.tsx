import { notFound, ReadonlyURLSearchParams } from 'next/navigation';

import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import BlogList from '~/components/amplience/blog/blog-list';

export interface BlogFilterProps {
  searchParams: ReadonlyURLSearchParams;
}

export default function BlogFilter({ searchParams }: BlogFilterProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);

  const hubName = amplienceClientOptions.hubName || process.env.AMPLIENCE_HUBNAME;

  if (!hubName) {
    return notFound();
  }

  return (
    <BlogList
      hubName={hubName}
      locale={amplienceClientOptions.locale}
      stagingEnvironment={amplienceClientOptions.stagingEnvironment}
    />
  );
}

export const runtime = 'edge';
