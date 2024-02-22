import { nanoid } from 'nanoid';
import React from 'react';

import { AmplienceContentItem } from '~/amplience-client';

import AmplienceContent from '../wrapper/amplience-content';

interface FlexibleSlotProps {
  contentTypes: AmplienceContentItem[];
}

const FlexibleSlot = ({ contentTypes = [] }: FlexibleSlotProps) => {
  return (
    <>
      {contentTypes.map((content) => {
        return <AmplienceContent content={content} key={nanoid()} />;
      })}
    </>
  );
};

export default FlexibleSlot;
