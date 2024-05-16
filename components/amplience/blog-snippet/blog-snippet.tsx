import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React from 'react';

import CallToAction from '../call-to-action/call-to-action';
import AmplienceContent from '../wrapper/amplience-content';

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
