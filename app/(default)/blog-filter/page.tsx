/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { Link } from '~/components/link';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';
import BlogCard from '~/components/amplience/blog/blog-card';
const HOMEPAGE_DELIVERY_KEY = String(process.env.AMPLIENCE_HOMEPAGE_DELIVERY_KEY);
const BLOG_POST_DELIVERY_KEY = String(process.env.AMPLIENCE_BLOG_POST_DELIVERY_KEY);

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClientOptions = clientOptionsMapper(searchParams);
  const amplienceClient = createAmplienceClient(amplienceClientOptions);

  const blogs = await amplienceClient.filterContentItems({
    filterBy: [
      {
        path: '/_meta/schema',
        value: 'https://demostore.amplience.com/content/blog',
      },
      {
        path: '/active',
        value: true,
      },
    ],
  });

  return (
    <>
      <h2 className="mb-4 text-xl font-bold md:text-2xl">Amplience Blog Posts</h2>
      <div
        style={{
          display: 'grid',
          gridGap: '1.5rem',
          gridTemplateColumns: 'repeat(3, 400px)',
          marginBottom: '2rem',
        }}
      >
        {blogs.responses
          ? blogs.responses.map((blog, index) => {
              return (
                <div key={index}>
                  <Link href={`/blog/${blog.content._meta.deliveryKey}`}>
                    <BlogCard {...blog.content} />
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export const runtime = 'edge';
