import { Link } from '@mui/material';
import * as React from 'react';
import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

type BaseLinkProps = { href: string; target?: HTMLAttributeAnchorTarget } & PropsWithChildren;

export const BaseLink: FC<BaseLinkProps> = (props) => {
  const { href, target, children } = props;

  return (
    <Link href={href} target={target} underline="hover">
      {children}
    </Link>
  );
};
