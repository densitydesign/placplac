import React from "react";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { Button, useRecordContext } from "react-admin";

export const AddGlossaryTermButton = () => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/glossary-terms/create?project=${record.id}`}
      label="Add a glossary term"
      title="Add a glossary term"
    >
      <Add />
    </Button>
  );
};
