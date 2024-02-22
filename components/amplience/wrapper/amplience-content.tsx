/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
import { AmplienceContentItem } from '~/amplience-client';

import CuratedProductGrid from '../curated-product-grid/curated-product-grid';
import DynamicProductGrid from '../dynamic-product-grid/dynamic-product-grid';
import FlexibleSlot from '../flexible-slot/flexible-slot';
import Image from '../image/image';
import SimpleBanner from '../simple-banner/simple-banner';
import Text from '../text/text';

const COMPONENT_MAPPING: {
  [key: string]: React.FC<any>;
} = {
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/content/simple-localized-banner': SimpleBanner,
  'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
  'https://demostore.amplience.com/content/curated-product-grid': CuratedProductGrid,
  'https://demostore.amplience.com/content/product-grid': DynamicProductGrid,
};

const MappingNotFound = (content: AmplienceContentItem) => {
  return (
    <pre>
      <code className="block break-words text-xs md:text-sm">
        {JSON.stringify(content, null, 2)}
      </code>
    </pre>
  );
};

export interface AmplienceContentProps {
  content: AmplienceContentItem;
}

// Wrapper component maps Amplience components based on content schema

const AmplienceContent = ({ content }: AmplienceContentProps) => {
  const contentSchema = content._meta?.schema;

  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;

  return (
    <>
      <Component {...content} />
    </>
  );
};

export default AmplienceContent;
