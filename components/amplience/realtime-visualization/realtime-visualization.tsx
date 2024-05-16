'use client';

import { useCallback, useState } from 'react';

import {
  useInitialRealtimeContent,
  useRealtimeVisualization,
} from '~/app/contexts/amplience/realtime-visualization-context';

import AmplienceContent from '../wrapper/amplience-content';

export interface RealtimeVisualizationProps {
  content?: Record<string, unknown>;
}

export default function RealtimeVisualization({ content }: RealtimeVisualizationProps) {
  const [contentItem, setContentItem] = useState<Record<string, unknown> | undefined>(content);

  const updateRealtimeContent = useCallback((realtimeContent: Record<string, unknown>) => {
    setContentItem(realtimeContent);
  }, []);

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  return <div>{contentItem && <AmplienceContent content={contentItem} />}</div>;
}
