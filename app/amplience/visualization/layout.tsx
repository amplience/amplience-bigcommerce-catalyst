import { PropsWithChildren } from 'react';

export default function VisualizationLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
      {children}
    </main>
  );
}
