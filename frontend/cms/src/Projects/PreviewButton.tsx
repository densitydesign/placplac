import React from "react";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import { Button, useLoading } from "react-admin";

interface PreviewButtonProps {
  project?: number | string;
}

export const PreviewButton = (props: PreviewButtonProps) => {
  const mainIsLoading = useLoading();

  return (
    <Button
      disabled={mainIsLoading}
      onClick={(e) => e.stopPropagation()}
      component={Link}
      to={{ pathname: `/preview/${props.project}` }}
      label="Preview"
      title="Preview"
    >
      <Visibility />
    </Button>
  );
};
