/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DefaultContentBody, Image } from 'dc-delivery-sdk-js';
import { notFound, ReadonlyURLSearchParams } from 'next/navigation';
import { Metadata } from 'next/types';
import React from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import { getImageURL } from '~/components/amplience/image/image.utils';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';

export interface AmplienceBlogPageProps {
  searchParams: ReadonlyURLSearchParams;
  params: { slugs: string[] };
}

export async function generateMetadata({
  searchParams,
  params,
}: AmplienceBlogPageProps): Promise<Metadata> {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);
  const slug = params.slugs.join('/');

  try {
    const blogPost = (
      await amplienceClient.getContentItemByKey(slug)
    ).toJSON() as DefaultContentBody;

    return {
      title: `Catalyst | ${blogPost.snippet?.title ?? ''} blog`,
      description: `${blogPost.snippet?.description}`,
      keywords: blogPost.snippet?.keywords as string[],
      openGraph: {
        images: getImageURL(blogPost.snippet?.image.image as Image),
      },
      twitter: {
        card: 'summary_large_image',
        site: '@amplience',
        creator: '@amplience',
        images: getImageURL(blogPost.snippet?.image.image as Image),
      },
    };
  } catch (e) {
    return notFound();
  }
}

export default async function AmplienceBlogPage({ searchParams, params }: AmplienceBlogPageProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);
  const slug = params.slugs.join('/');

  try {
    const blogPost = (
      await amplienceClient.getContentItemByKey(slug)
    ).toJSON() as DefaultContentBody;

    return <AmplienceContent content={blogPost} />;
  } catch (e) {
    return notFound();
  }
}

export const runtime = 'edge';
