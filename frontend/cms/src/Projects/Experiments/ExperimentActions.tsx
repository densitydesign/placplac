import { TopToolbar, Button } from "ra-ui-materialui";
import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useRecordContext, useRedirect } from "ra-core";

interface ExperimentActionsProps {
  project?: number | string;
}
export const ExperimentActions = (props: ExperimentActionsProps) => {
  const redirect = useRedirect();
  const record = useRecordContext();

  return (
    <TopToolbar>
      <Button
        label="Back to project"
        onClick={() =>
          redirect(
            `/projects/${
              record && record.project ? record.project : props.project
            }/1`
          )
        }
      >
        <KeyboardBackspaceIcon />
      </Button>
    </TopToolbar>
  );
};
