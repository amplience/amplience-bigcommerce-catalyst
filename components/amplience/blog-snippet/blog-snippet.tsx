import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React from 'react';

import CallToAction from '../call-to-action/call-to-action';
import AmplienceContent from '../wrapper/amplience-content';
import { Link } from '~/components/link';
import Image from '../image/image';

export interface CallToAction {
  type: string;
  value: string;
  label: string;
}

export interface BlogSnippetProps {
  image: DefaultContentBody;
  title: string;
  blogdate: string;
  author: string;
  category?: string[];
  description: string;
  cta?: CallToAction;
  tags: string[];
  keywords: string;
}

const buildCTAUrl = (cta: CallToAction) => {
  switch (cta.type) {
    case 'URL':
      return cta.value;

    case 'Category ID':
      return `/category/${cta.value}`;

    case 'Product SKU':
      return `/product/${cta.value}`;

    case 'Page ID':
      return `/${cta.value}`;

    default:
      return '#';
  }
};

const BlogSnippet = ({
  image,
  title,
  blogdate,
  author,
  category,
  description,
  cta,
}: BlogSnippetProps) => {
  return (
    <>
      <Image query="w=1500&sm=aspect&aspect=16:9" image={image.image} _meta={image._meta} />
      <div>
        {category?.length ? <small>{category.join(', ')}</small> : null}
        {title ? (
          <>
            <h2 className="mb-4 mt-4 text-2xl font-black lg:text-3xl">
              <Link href="/blog-filter">Blogs</Link>
            </h2>
            <h1 className="mb-4 mt-4 text-3xl font-black lg:text-5xl">{title}</h1>
          </>
        ) : null}
        <div>
          {author ? <h4 className="mb-2 text-gray-500">{author}</h4> : null}
          {blogdate ? <h4 className="mb-2 text-gray-500">{blogdate}</h4> : null}
        </div>

        {description ? <h2 className="mb-4 text-xl font-bold lg:text-2xl">{description}</h2> : null}

        {cta ? (
          <CallToAction
            href={buildCTAUrl(cta)}
            key={cta.label}
            style={{
              marginTop: '15px !important',
              marginRight: '15px !important',
            }}
            variant="contained"
          >
            {cta.label}
          </CallToAction>
        ) : null}
      </div>
    </>
  );
};

export default BlogSnippet;
