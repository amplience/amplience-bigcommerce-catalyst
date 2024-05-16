import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface CallToActionProps extends PropsWithChildren {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'outlined' | 'contained';
}

const CallToAction = ({
  children,
  href,
  className,
  variant = 'outlined',
  ...other
}: CallToActionProps) => {
  return href ? (
    <Link
      href={href}
      className="font mt-4 rounded bg-[#333] px-3.5 py-2.5 text-xs font-bold text-[#eee] no-underline hover:bg-[#eee] hover:text-[#333] hover:no-underline"
      {...other}
    >
      {children}
    </Link>
  ) : null;
};

export default CallToAction;
