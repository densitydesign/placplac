import { TopToolbar, Button } from "ra-ui-materialui";
import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useRecordContext, useRedirect } from "ra-core";

interface GlossaryTermActionsProps {
  project?: number | string;
}
export const GlossaryTermActions = (props: GlossaryTermActionsProps) => {
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
            }/2`
          )
        }
      >
        <KeyboardBackspaceIcon />
      </Button>
    </TopToolbar>
  );
};
