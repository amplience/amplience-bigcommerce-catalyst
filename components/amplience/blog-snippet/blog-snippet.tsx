import React from 'react';
import { AmplienceContentItem } from '~/amplience-client';
import AmplienceContent from '../wrapper/amplience-content';
import CallToAction from '../call-to-action/call-to-action';
import NextHead from 'next/head';
import { AmplienceImage } from '../image/image.types';
import { getImageURL } from '../image/image.utils';

export type BlogSnippetProps = {
  image: AmplienceContentItem;
  title: string;
  blogdate: string;
  author: string;
  category: string[];
  description: string;
  cta: any;
  tags: any[];
  keywords: string;
};

const buildCTAUrl = (cta: any) => {
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
  keywords,
}: BlogSnippetProps) => {
  return (
    <>
      <NextHead>
        <title>{title || 'Amplience Retail Storefront Website'}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title || 'Amplience Retail Storefront Website'} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:image" content={getImageURL(image.image as AmplienceImage)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@amplience" />
        <meta name="twitter:creator" content="@amplience" />
        <meta name="twitter:title" content={title || 'Amplience Retail Storefront Website'} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={getImageURL(image.image as AmplienceImage)} />
      </NextHead>
      <div className="amp-dc-banner js_dc_banner">
        <div className="amp-dc-banner-wrapper">
          <div className="amp-dc-banner-pic-wrap">
            <AmplienceContent content={image} />
          </div>
        </div>
      </div>

      <div className="amp-dc-snippet-info-wrap">
        {category?.length ? <small>{category.join(', ')}</small> : null}
        {title ? <h1 className="mb-4 mt-4 text-3xl font-black lg:text-5xl">{title}</h1> : null}
        <div className="amp-dc-snippet-info-wrap__description">
          {author ? <h4 className="mb-2 text-gray-500">{author}</h4> : null}
          {blogdate ? <h4 className="mb-2 text-gray-500">{blogdate}</h4> : null}
        </div>

        {description ? <h2 className="mb-4 text-xl font-bold lg:text-2xl">{description}</h2> : null}

        {cta ? (
          <CallToAction
            key={cta?.label}
            href={buildCTAUrl(cta)}
            style={{
              marginTop: '15px !important',
              marginRight: '15px !important',
            }}
            variant={'contained'}
          >
            {cta?.label}
          </CallToAction>
        ) : null}
      </div>
    </>
  );
};

export default BlogSnippet;
