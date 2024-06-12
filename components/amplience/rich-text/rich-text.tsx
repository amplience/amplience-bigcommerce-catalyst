/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import ReactMarkdown from 'markdown-to-jsx';
import React from 'react';

import { Link } from '~/components/link';

import { getImageURL } from '../image/image.utils';
import AmplienceContent from '../wrapper/amplience-content';

type TextAlign = 'end' | 'left' | 'center' | 'right' | 'start' | undefined;

export interface RichTextProps {
  text: Array<{ type: string; data: any }>;
  align: TextAlign;
}

const RichText = ({ text = [], align = 'left' }: RichTextProps & DefaultContentBody) => {
  const options = {
    overrides: {
      a: { component: Link },
      h1: {
        component: ({ ...props }) => (
          <h1 className="mb-4 mt-4 text-3xl font-black lg:text-5xl">
            <span {...props} />
          </h1>
        ),
      },
      h2: {
        component: ({ ...props }) => (
          <h2 className="mb-4 mt-4 text-2xl font-black lg:text-4xl">
            <span {...props} />
          </h2>
        ),
      },
      h3: {
        component: ({ ...props }) => (
          <h3 className="mb-4 mt-4 text-xl font-black lg:text-3xl">
            <span {...props} />
          </h3>
        ),
      },
      h4: {
        component: ({ ...props }) => (
          <h4 className="mb-4 mt-4 text-xl font-black lg:text-2xl">
            <span {...props} />
          </h4>
        ),
      },
      h5: {
        component: ({ ...props }) => (
          <h5 className="mb-4 mt-4 text-xl font-black lg:text-xl">
            <span {...props} />
          </h5>
        ),
      },
      h6: {
        component: ({ ...props }) => (
          <h5 className="mb-4 mt-4 font-black">
            <span {...props} />
          </h5>
        ),
      },
      ul: {
        component: ({ ...props }) => (
          <ul style={{ listStyle: 'disc', margin: '0px', paddingLeft: '40px' }}>
            <span {...props} />
          </ul>
        ),
      },
      ol: {
        component: ({ ...props }) => (
          <ol style={{ listStyle: 'decimal', margin: '0px', paddingLeft: '40px' }}>
            <span {...props} />
          </ol>
        ),
      },
      li: {
        component: ({ ...props }) => (
          <li>
            <span {...props} />
          </li>
        ),
      },
    },
  };

  return (
    <>
      {text.map((item, index) => {
        const { type, data } = item;

        switch (type) {
          case 'markdown':
            return (
              <div
                className="amp-dc-text"
                key={index}
                style={{ textAlign: align, padding: '10px 0' }}
              >
                {Boolean(data) && <ReactMarkdown options={options}>{data}</ReactMarkdown>}
              </div>
            );

          case 'dc-content-link':
            return data && <AmplienceContent content={data as DefaultContentBody} key={index} />;

          case 'dc-image-link':
            return (
              data && (
                <picture className="amp-dc-image" key={data.name}>
                  <img
                    alt={data.name}
                    className="amp-dc-image-pic"
                    src={getImageURL(data, { strip: true })}
                    width="100%"
                  />
                </picture>
              )
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default RichText;
