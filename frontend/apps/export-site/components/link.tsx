import NextLink from "next/link";
import React from "react";

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
}

const Link = React.forwardRef(function Link(
  { href, prefetch, ...props }: IProps,
  ref: any
) {
  return (
    <NextLink href={href} prefetch={prefetch || false}>
      <a {...props} ref={ref} />
    </NextLink>
  );
});

export default Link;
