import {
  DeleteButton,
  required,
  SaveButton,
  SimpleForm,
  SimpleFormProps,
  TextInput,
  Toolbar,
  ToolbarProps,
} from "react-admin";

const ReferenceFormToolbar = (props: ToolbarProps) => (
  <Toolbar
    style={{ display: "flex", justifyContent: "space-between" }}
    {...props}
  >
    <SaveButton />
    {props.record && props.record.id && (
      <DeleteButton redirect={`/projects/${props.record.project}/3`} />
    )}
  </Toolbar>
);

export const ReferenceForm = (props: Omit<SimpleFormProps, "children">) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;
  const redirect = `/projects/${project}/3`;

  return (
    <SimpleForm
      {...props}
      redirect={redirect}
      toolbar={<ReferenceFormToolbar />}
    >
      <TextInput multiline fullWidth source="title" validate={[required()]} />
      <TextInput multiline fullWidth source="link" />
    </SimpleForm>
  );
};
