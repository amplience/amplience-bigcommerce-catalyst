import { useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';
import type { UrlObject } from 'url';

type Url = string | UrlObject;

import { Link } from '~/components/link';

/**
 * This custom `Link` component extends `~/components/link.ts` with additional query string controls.
 * To help power Amplience preview we use this component to persists the query string parameters
 * when naviagting the app using this Link component
 */

const LinkWithQuery = ({
  href,
  ...props
}: { href: Url; className?: string } & PropsWithChildren) => {
  const pathname = typeof href === 'object' ? href.pathname : href;

  const searchParams = useSearchParams();

  return (
    <Link
      {...props}
      href={{
        pathname,
        query: searchParams.toString(),
      }}
    />
  );
};

export default LinkWithQuery;
