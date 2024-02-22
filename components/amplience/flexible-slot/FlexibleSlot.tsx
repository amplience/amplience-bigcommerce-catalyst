import React from 'react'
import { nanoid } from 'nanoid'
import { AmplienceContentItem } from '~/amplience-client';
import AmplienceContent from '../wrapper/AmplienceContent';

interface Props {
    contentTypes: AmplienceContentItem[]
}

const FlexibleSlot = ({contentTypes = []}) => {
    return (
        <>
            {
                contentTypes.map(content => {
                    return <AmplienceContent key={ nanoid() } content={content} />;
                })
            }
        </>
    );
}

export default FlexibleSlot;