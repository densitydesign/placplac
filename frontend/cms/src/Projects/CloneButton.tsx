import React, { useState } from "react";
import Copy from "@material-ui/icons/FileCopy";
import { Button, useListContext, useLoading } from "react-admin";
import { client } from "../dataProvider";
import { CircularProgress } from "@material-ui/core";

interface CloneButtonProps {
  project: number | string;
}

export const CloneButton = (props: CloneButtonProps) => {
  const mainIsLoading = useLoading();
  const { refetch } = useListContext();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    client(`projects/${props.project}/clone`, { method: "GET" })
      .then(() => {
        refetch();
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Button
      disabled={mainIsLoading || isLoading}
      onClick={onClick}
      label="Clone"
      title="Clone"
    >
      {isLoading ? <CircularProgress size={18} thickness={2} /> : <Copy />}
    </Button>
  );
};
