import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  Button,
  Form,
  SaveButton,
  TextInput,
  useRecordContext,
  useRedirect,
  useNotify,
  NumberInput,
  maxLength,
  RecordContextProvider,
  useCreate,
  required,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../../useToggler';
import { FieldValues } from 'react-hook-form';

export const AddStepButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [create, { isLoading }] = useCreate();
  const record = useRecordContext();
  const { id: experiment } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = (values: FieldValues) =>
    create(
      'steps',
      {
        data: values,
      },
      {
        onSuccess: (data) => {
          setFalse();
          redirect('edit', '/steps', data.id);
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
        label="Add step"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <RecordContextProvider value={{ experiment }}>
          <Form onSubmit={onSave}>
            <>
              <DialogContent>
                {/* <NumberInput
                  source="step_number"
                  validate={[required()]}
                  helperText="The number indicating the order in which the steps are displayed"
                /> */}
                <TextInput
                  multiline
                  fullWidth
                  source="title"
                  label="Title"
                  helperText="The title of the step"
                  validate={[required(), maxLength(255)]}
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
