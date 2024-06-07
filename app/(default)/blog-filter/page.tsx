/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ReadonlyURLSearchParams } from 'next/navigation';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import BlogList from '~/components/amplience/blog/blog-list';

export interface BlogFilterProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function BlogFilter({ searchParams }: BlogFilterProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  amplienceClientOptions.hubName = String(process.env.AMPLIENCE_HUBNAME);

  return <BlogList amplienceClientOptions={amplienceClientOptions} />;
}

export const runtime = 'edge';
