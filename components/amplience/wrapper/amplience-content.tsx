/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultContentBody } from 'dc-delivery-sdk-js';

import Blog from '../blog/blog';
import BlogSnippet from '../blog-snippet/blog-snippet';
import Card from '../card/card';
import CardList from '../card-list/card-list';
import CuratedProductGrid from '../curated-product-grid/curated-product-grid';
import DynamicProductGrid from '../dynamic-product-grid/dynamic-product-grid';
import FlexibleSlot from '../flexible-slot/flexible-slot';
import Image from '../image/image';
import RichText from '../rich-text/rich-text';
import SimpleBanner from '../simple-banner/simple-banner';
import Text from '../text/text';

type ComponentMapType = Record<string, (...args: any) => any>;

const COMPONENT_MAPPING: ComponentMapType = {
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
  'https://demostore.amplience.com/content/curated-product-grid': CuratedProductGrid,
  'https://demostore.amplience.com/content/product-grid': DynamicProductGrid,
  'https://demostore.amplience.com/content/card': Card,
  'https://demostore.amplience.com/content/card-list': CardList,
  'https://demostore.amplience.com/content/rich-text': RichText,
  'https://demostore.amplience.com/content/blog': Blog,
  'https://demostore.amplience.com/content/blog-snippet': BlogSnippet,
};

const MappingNotFound = (content: DefaultContentBody) => {
  return (
    <div
      style={{
        height: '400px',
        backgroundColor: '#eee',
        border: '1px solid black',
        padding: '15px',
        margin: '10px',
      }}
    >
      <h3 className="text-xl font-black">{content._meta.name}</h3>
      <h4 className="italic">{content._meta.deliveryId}</h4>
      <p className="mb-4 mt-4">No render available for this component. Showing JSON content.</p>
      <pre
        style={{
          maxHeight: '250px',
          overflowY: 'scroll',
        }}
      >
        <code className="block break-words text-xs md:text-sm">
          {JSON.stringify(content, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export interface AmplienceContentProps {
  content?: DefaultContentBody;
}

// Wrapper component maps Amplience components based on content schema
const AmplienceContent = ({ content }: AmplienceContentProps) => {
  const contentSchema = content?._meta.schema || '';

  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;

  return <Component {...content} />;
};

export default AmplienceContent;
