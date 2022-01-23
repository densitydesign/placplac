import { useMemo } from "react";
import {
  DeleteButton,
  SaveButton,
  SimpleForm,
  SimpleFormProps,
  Toolbar,
  ToolbarProps,
} from "react-admin";
import { CustomRichTextInput } from "../../components/CustomRichTextInput";

const ReferenceFormToolbar = (props: ToolbarProps) => (
  <Toolbar
    style={{ display: "flex", justifyContent: "space-between" }}
    {...props}
  >
    <SaveButton />
    {props.record && props.record.id && props.record.project && (
      <DeleteButton redirect={`/projects/${props.record.project}/3`} />
    )}
    {props.record && props.record.id && props.record.experiment && (
      <DeleteButton redirect={`/experiments/${props.record.experiment}/5`} />
    )}
  </Toolbar>
);

export const ReferenceForm = (props: Omit<SimpleFormProps, "children">) => {
  const redirectLink = useMemo(() => {
    if (props.initialValues) {
      if ("project" in props.initialValues && props.initialValues.project) {
        return `/projects/${props.initialValues.project}/3`;
      }
      if (
        "experiment" in props.initialValues &&
        props.initialValues.experiment
      ) {
        return `/experiments/${props.initialValues.experiment}/5`;
      }
    }
    if (props.record) {
      if ("project" in props.record && props.record.project) {
        return `/projects/${props.record.project}/3`;
      }
      if ("experiment" in props.record && props.record.experiment) {
        return `/experiments/${props.record.experiment}/5`;
      }
    }
  }, [props.initialValues, props.record]);

  return (
    <SimpleForm
      {...props}
      redirect={redirectLink}
      toolbar={<ReferenceFormToolbar />}
    >
      <CustomRichTextInput
        source="description"
        label="Description of reference"
        small
      />
    </SimpleForm>
  );
};
