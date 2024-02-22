'use client';

import { useCallback, useState } from 'react';

import { AmplienceContentItem } from '~/amplience-client';
import {
  useInitialRealtimeContent,
  useRealtimeVisualization,
} from '~/app/contexts/compare-products-context/amplience/realtime-visualization-context';

import AmplienceContent from '../wrapper/amplience-content';

export interface RealtimeVisualizationProps {
  content: AmplienceContentItem;
}

export default function RealtimeVisualization({ content }: RealtimeVisualizationProps) {
  const [contentItem, setContentItem] = useState<AmplienceContentItem | undefined>(content);

  const updateRealtimeContent = useCallback((realtimeContent: AmplienceContentItem) => {
    setContentItem(realtimeContent);
  }, []);

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  return <div>{contentItem && <AmplienceContent content={contentItem} />}</div>;
}
