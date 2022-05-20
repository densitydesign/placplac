import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  Button,
  Form,
  SaveButton,
  TextInput,
  useNotify,
  useRecordContext,
  required,
  maxLength,
  FileInput,
  FileField,
  useEditContext,
  RecordContextProvider,
  useDataProvider,
} from 'react-admin';
import { useMutation } from 'react-query';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../../../useToggler';
import { FieldValues } from 'react-hook-form';
import { client } from '../../../dataProvider';

export const AddStepDownloadButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const record = useRecordContext();
  const { id: step } = record;
  const notify = useNotify();
  const { refetch } = useEditContext();
  const dataProvider = useDataProvider();
  const { mutate: onSubmit, isLoading } = useMutation(
    ['project-media'],
    (values: FieldValues) =>
      dataProvider.createMultipart('step-downloads', {
        data: values,
      }),
    {
      onSuccess: (data) => {
        setFalse();
        refetch && refetch();
      },
      onError: (error) => {
        notify('ra.page.error', { type: 'error' });
      },
    }
  );
  return (
    <>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={setTrue}
        label="Add download"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <RecordContextProvider value={{ step }}>
          <Form onSubmit={onSubmit}>
            <>
              <DialogContent>
                <TextInput
                  multiline
                  fullWidth
                  source="title"
                  label="Title"
                  placeholder="Type the download title, for example 'Download dataset'"
                  helperText="The download title"
                  validate={[required(), maxLength(150)]}
                />
                <FileInput source="file" validate={[required()]}>
                  <FileField source="src" title="title" />
                </FileInput>
              </DialogContent>
              <DialogActions>
                <Button
                  label="ra.action.cancel"
                  onClick={setFalse}
                  disabled={isLoading}
                >
                  <IconCancel />
                </Button>
                <SaveButton />
              </DialogActions>
            </>{' '}
          </Form>{' '}
        </RecordContextProvider>
      </Dialog>
    </>
  );
};
