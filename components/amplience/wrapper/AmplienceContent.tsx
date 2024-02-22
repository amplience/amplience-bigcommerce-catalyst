import { AmplienceContentItem } from "~/amplience-client";

import Image from '../image/Image';
import SimpleBanner from '../simple-banner/SimpleBanner';
import FlexibleSlot from "../flexible-slot/FlexibleSlot";
import CuratedProductGrid from "../curated-product-grid/CuratedProductGrid";
import Text from "../text/Text";
import DynamicProductGrid from "../dynamic-product-grid/DynamicProductGrid";

const COMPONENT_MAPPING: {
  [key: string]: React.FC<any>;
} = {
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/content/simple-localized-banner':
    SimpleBanner,
  'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
  'https://demostore.amplience.com/content/curated-product-grid': CuratedProductGrid,
  'https://demostore.amplience.com/content/product-grid': DynamicProductGrid,
};

const MappingNotFound = (content: AmplienceContentItem) => {
  return (
    <pre>
      <code className="text-xs md:text-sm block break-words">
        {JSON.stringify(content, null, 2)}
      </code>
    </pre>
  );
};

type AmplienceContentProps = {
  content: AmplienceContentItem;
};
/**
 * Wrapper component maps Amplience components based on content schema
 */
const AmplienceContent = ({content}: AmplienceContentProps) => {
  const contentSchema = content?._meta?.schema;
  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;
  return <>{Component && <Component {...content}></Component>}</>;
};

export default AmplienceContent;
