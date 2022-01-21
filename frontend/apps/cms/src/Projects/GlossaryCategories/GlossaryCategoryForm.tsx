import {
  DeleteButton,
  maxLength,
  required,
  SaveButton,
  SimpleForm,
  SimpleFormProps,
  TextInput,
  Toolbar,
  ToolbarProps,
} from "react-admin";

const GlossaryCategoryFormToolbar = (props: ToolbarProps) => (
  <Toolbar
    style={{ display: "flex", justifyContent: "space-between" }}
    {...props}
  >
    <SaveButton />
    {props.record && props.record.id && (
      <DeleteButton redirect={`/projects/${props.record.project}/2`} />
    )}
  </Toolbar>
);

export const GlossaryCategoryForm = (
  props: Omit<SimpleFormProps, "children">
) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;
  const redirect = `/projects/${project}/2`;

  return (
    <SimpleForm
      {...props}
      redirect={redirect}
      toolbar={<GlossaryCategoryFormToolbar />}
    >
      <TextInput
        multiline
        fullWidth
        source="title"
        validate={[required(), maxLength(100)]}
      />
      <TextInput
        type="color"
        fullWidth
        source="color"
        validate={[required(), maxLength(10)]}
      />
      <TextInput validate={[required()]} source="description" multiline />
    </SimpleForm>
  );
};
