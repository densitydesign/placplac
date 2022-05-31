import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  Button,
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
  Form,
  useDataProvider,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../../useToggler';
import { useMutation } from 'react-query';
import { FieldValues } from 'react-hook-form';
export const AddExperimentAdditionalMaterialButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const record = useRecordContext();
  const { id: experiment } = record;
  const notify = useNotify();
  const { refetch } = useEditContext();

  const dataProvider = useDataProvider();
  const { mutate, isLoading } = useMutation(
    ['experiment-additional-material', record.id],
    (values: FieldValues) =>
      dataProvider.createMultipart('experiment-additional-material', {
        data: values,
        id: record.id,
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
        label="Add additional material"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <RecordContextProvider value={{ experiment }}>
          <Form onSubmit={mutate}>
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
                  disabled={isLoading}
                >
                  <IconCancel />
                </Button>
                <SaveButton alwaysEnable />
              </DialogActions>
            </>
          </Form>
        </RecordContextProvider>
      </Dialog>
    </>
  );
};
