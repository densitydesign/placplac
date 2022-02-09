import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import { Button, useLoading } from 'react-admin';

interface PreviewButtonProps {
  project?: number | string;
}

const LinkBehavior = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} target="_blank" />
);
export const PreviewButton = (props: PreviewButtonProps) => {
  const mainIsLoading = useLoading();

  return (
    <Button
      disabled={mainIsLoading}
      onClick={(e) => e.stopPropagation()}
      component={LinkBehavior}
      to={{ pathname: `/preview/${props.project}` }}
      label="Preview"
      title="Preview"
    >
      <Visibility />
    </Button>
  );
};
