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
  useRecordContext,
} from 'react-admin';

const GlossaryCategoryFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();

  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && record.id && (
        <DeleteButton redirect={`/projects/${record.project}/2`} />
      )}
    </Toolbar>
  );
};

export const GlossaryCategoryForm = (
  props: Omit<SimpleFormProps, 'children'>
) => {
  const record = useRecordContext();

  const project =
    props.defaultValues && 'project' in props.defaultValues
      ? props.defaultValues.project
      : record?.project;
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
