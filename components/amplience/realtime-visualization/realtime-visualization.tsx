/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { useCallback, useState } from 'react';

import {
  useInitialRealtimeContent,
  useRealtimeVisualization,
} from '~/app/contexts/amplience/realtime-visualization-context';

import AmplienceContent from '../wrapper/amplience-content';

export interface RealtimeVisualizationProps {
  content?: DefaultContentBody;
}

export default function RealtimeVisualization({ content }: RealtimeVisualizationProps) {
  const [contentItem, setContentItem] = useState<DefaultContentBody | undefined>(content);

  const updateRealtimeContent = useCallback((realtimeContent: Record<string, unknown>) => {
    setContentItem(realtimeContent as DefaultContentBody);
  }, []);

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  return <div>{contentItem && <AmplienceContent content={contentItem} />}</div>;
}
