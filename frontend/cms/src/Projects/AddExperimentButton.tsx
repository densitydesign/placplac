import React from "react";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { Button, useRecordContext } from "react-admin";

export const AddExperimentButton = () => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/experiments/create?project=${record.id}`}
      label="Add a experiment"
      title="Add a experiment"
    >
      <Add />
    </Button>
  );
};
