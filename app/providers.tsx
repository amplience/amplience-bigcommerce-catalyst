'use client';

import { PropsWithChildren } from 'react';

import { CompareProductsProvider } from '~/app/contexts/compare-products-context';

import { RealtimeVisualizationProvider } from './contexts/amplience/realtime-visualization-context';

export function Providers({ children }: PropsWithChildren) {
  return (
    <CompareProductsProvider>
      <RealtimeVisualizationProvider>{children}</RealtimeVisualizationProvider>
    </CompareProductsProvider>
  );
}
