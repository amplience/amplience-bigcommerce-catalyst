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
      {contentTypes.map((content, index) => {
        return <AmplienceContent content={content} key={index} />;
      })}
    </>
  );
};

export default FlexibleSlot;
