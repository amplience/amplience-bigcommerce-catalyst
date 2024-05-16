import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { nanoid } from 'nanoid';
import React from 'react';

import AmplienceContent from '../wrapper/amplience-content';

interface FlexibleSlotProps {
  contentTypes: DefaultContentBody[];
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
