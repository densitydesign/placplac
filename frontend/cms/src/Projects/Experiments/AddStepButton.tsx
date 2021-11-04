import React from "react";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { Button, useRecordContext } from "react-admin";

export const AddStepButton = () => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/steps/create?experiment=${record.id}`}
      label="Add step"
      title="Add step"
    >
      <Add />
    </Button>
  );
};
