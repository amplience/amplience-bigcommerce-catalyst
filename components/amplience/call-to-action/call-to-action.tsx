'use client';

import React, { PropsWithChildren } from 'react';

import LinkWithQuery from '../link-with-query/link-with-query';

interface CallToActionProps extends PropsWithChildren {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'outlined' | 'contained';
}

const CallToAction = ({ children, href, className, ...other }: CallToActionProps) => {
  return href ? (
    <LinkWithQuery
      className="font mt-4 rounded bg-[#333] px-3.5 py-2.5 text-xs font-bold text-[#eee] no-underline hover:bg-[#eee] hover:text-[#333] hover:no-underline"
      href={href}
      {...other}
    >
      {children}
    </LinkWithQuery>
  ) : null;
};

export default CallToAction;
