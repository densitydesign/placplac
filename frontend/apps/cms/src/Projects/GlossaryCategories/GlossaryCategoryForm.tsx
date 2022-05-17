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
  useNotify,
  useRecordContext,
  useRedirect,
} from 'react-admin';

const GlossaryCategoryFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  const redirectPath = `/projects/${record?.project}/2`;
  const redirect = useRedirect();
  const notify = useNotify();
  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton
        type={'button'}
        mutationOptions={{
          onSuccess: () => {
            notify('ra.notification.updated', {
              type: 'info',
              messageArgs: { smart_count: 1 },
              undoable: true,
            });
            redirect(redirectPath);
          },
        }}
      />
      {record && record.id && <DeleteButton redirect={redirectPath} />}
    </Toolbar>
  );
};

export const GlossaryCategoryForm = (
  props: Omit<SimpleFormProps, 'children'>
) => {
  return (
    <SimpleForm {...props} toolbar={<GlossaryCategoryFormToolbar />}>
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
