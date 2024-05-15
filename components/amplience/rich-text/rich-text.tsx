import React from 'react';
import { AmplienceContentItem } from '~/amplience-client';
import ReactMarkdown from 'markdown-to-jsx';
import AmplienceContent from '../wrapper/amplience-content';
import { getImageURL } from '../image/image.utils';
import { Link } from '~/components/link';

type RichTextProps = {} & AmplienceContentItem;

const RichText = ({ text = [], align = 'left' }: RichTextProps) => {
  const options = {
    overrides: {
      a: { component: Link },
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
      {text.map((item: any, index: number) => {
        const { type, data } = item;

        switch (type) {
          case 'markdown':
            return (
              <div
                key={index}
                className="amp-dc-text"
                style={{ textAlign: align, padding: '10px 0' }}
              >
                {data && <ReactMarkdown options={options}>{data}</ReactMarkdown>}
              </div>
            );
          case 'dc-content-link':
            return data && <AmplienceContent key={index} content={data} />;
          case 'dc-image-link':
            return (
              data && (
                <picture key={data.name} className="amp-dc-image">
                  <img
                    src={getImageURL(data, { strip: true })}
                    className="amp-dc-image-pic"
                    width="100%"
                    alt={data.name}
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
