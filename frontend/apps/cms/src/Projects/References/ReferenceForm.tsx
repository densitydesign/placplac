import { redirect } from 'next/dist/server/api-utils';
import { useMemo } from 'react';
import {
  DeleteButton,
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
import { CustomRichTextInput } from '../../components/CustomRichTextInput';

const ReferenceFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  const redirectPath = `/projects/${record?.project}/3`;
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
      {record && record.id && record.project && (
        <DeleteButton redirect={redirectPath} />
      )}
    </Toolbar>
  );
};

export const ReferenceForm = (props: Omit<SimpleFormProps, 'children'>) => {
  return (
    <SimpleForm {...props} toolbar={<ReferenceFormToolbar />}>
      <CustomRichTextInput
        source="description"
        label="Description of reference"
        validate={required()}
        small
      />
      <TextInput
        source="in_text_citation"
        label="In text citation"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  );
};
