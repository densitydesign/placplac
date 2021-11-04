import { TopToolbar, Button } from "ra-ui-materialui";
import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useRecordContext, useRedirect } from "ra-core";

interface StepActionsProps {
  experiment?: number | string;
}
export const StepActions = (props: StepActionsProps) => {
  const redirect = useRedirect();
  const record = useRecordContext();

  return (
    <TopToolbar>
      <Button
        label="Back to experiment"
        onClick={() =>
          redirect(
            `/experiments/${
              record && record.experiment ? record.experiment : props.experiment
            }/5`
          )
        }
      >
        <KeyboardBackspaceIcon />
      </Button>
    </TopToolbar>
  );
};
