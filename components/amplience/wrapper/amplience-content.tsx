import { AmplienceContentItem } from '~/amplience-client';

import CuratedProductGrid from '../curated-product-grid/curated-product-grid';
import DynamicProductGrid from '../dynamic-product-grid/dynamic-product-grid';
import FlexibleSlot from '../flexible-slot/flexible-slot';
import Image from '../image/image';
import SimpleBanner from '../simple-banner/simple-banner';
import Text from '../text/text';
import Card from '../card/card';
import CardList from '../card-list/card-list';

interface ComponentMapType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any) => any;
}

const COMPONENT_MAPPING: ComponentMapType = {
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/content/simple-localized-banner': SimpleBanner,
  'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
  'https://demostore.amplience.com/content/curated-product-grid': CuratedProductGrid,
  'https://demostore.amplience.com/content/product-grid': DynamicProductGrid,
  'https://demostore.amplience.com/content/card': Card,
  'https://demostore.amplience.com/content/card-list': CardList,
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
  content?: AmplienceContentItem;
}

// Wrapper component maps Amplience components based on content schema
const AmplienceContent = ({ content }: AmplienceContentProps) => {
  // eslint-disable-next-line no-underscore-dangle
  const contentSchema = content?._meta?.schema || '';

  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;

  return <Component {...content} />;
};

export default AmplienceContent;
