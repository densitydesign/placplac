import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import {
  Button,
  FormWithRedirect,
  SaveButton,
  TextInput,
  useMutation,
  useNotify,
  useRecordContext,
  Record,
  required,
  maxLength,
  FileInput,
  FileField,
  useEditContext,
} from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import IconContentAdd from '@material-ui/icons/Add';
import { useToggler } from '../../useToggler';

export const AddExperimentAdditionalMaterialButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: experiment } = record;
  const notify = useNotify();
  const { refetch } = useEditContext();
  const onSave = (values: Partial<Record>) =>
    mutate(
      {
        type: 'createMultipart',
        resource: 'experiment-additional-material',
        payload: {
          data: { experiment, file: values.file },
        },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          refetch && refetch();
        },
        onFailure: (error) => {
          notify('ra.page.error', 'error');
        },
      }
    );

  return (
    <>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={setTrue}
        label="Add additional material"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="steps"
          initialValues={{ step: experiment }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <FileInput source="file" validate={[required()]}>
                  <FileField source="src" title="title" />
                </FileInput>
              </DialogContent>
              <DialogActions>
                <Button
                  label="ra.action.cancel"
                  onClick={setFalse}
                  disabled={loading}
                >
                  <IconCancel />
                </Button>
                <SaveButton
                  handleSubmitWithRedirect={handleSubmitWithRedirect}
                  saving={saving}
                  disabled={loading}
                />
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
};
