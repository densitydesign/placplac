import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  Button,
  Form,
  SaveButton,
  TextInput,
  useNotify,
  useRecordContext,
  useRedirect,
  required,
  useCreate,
  RecordContextProvider,
  maxLength,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../useToggler';
import { FieldValues } from 'react-hook-form';

export const AddExperimentButton = () => {
  const { value, setTrue, setFalse } = useToggler();

  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const [create, { isLoading }] = useCreate();
  const onSave = (values: FieldValues) =>
    create(
      'experiments',
      {
        data: values,
      },
      {
        onSuccess: (data) => {
          setFalse();
          redirect('edit', '/experiments', data.id);
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
        label="Add experiment"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <RecordContextProvider value={{ project }}>
          <Form onSubmit={onSave}>
            <>
              <DialogContent>
                <TextInput
                  fullWidth
                  multiline
                  validate={[required(), maxLength(200)]}
                  source="title"
                  label="Title (200)"
                  placeholder="a short title representative of the experiment"
                  helperText="The title of the experiment"
                />
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
            </>
          </Form>
        </RecordContextProvider>
      </Dialog>
    </>
  );
};
