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
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;
  const redirect = `/projects/${project}/3`;

  const redirectLink = useMemo(() => {
    if (props.initialValues) {
      if ("project" in props.initialValues) {
      }
    }
  }, []);

  return (
    <SimpleForm
      {...props}
      redirect={redirect}
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
