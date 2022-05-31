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
  maxLength,
  RecordContextProvider,
  useCreate,
  SaveContextProvider,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../useToggler';
import { FieldValues } from 'react-hook-form';

export const AddGlossaryCategoryButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const [create, { isLoading }] = useCreate();
  const onSave = (values: FieldValues) =>
    create(
      'glossary-categories',
      {
        data: values,
      },
      {
        onSuccess: (data) => {
          setFalse();
          redirect('edit', '/glossary-categories', data.id);
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
        label="Add glossary category"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <SaveContextProvider
          value={{
            saving: isLoading,
          }}
        >
          <RecordContextProvider value={{ project }}>
            <Form onSubmit={onSave}>
              <>
                <DialogContent>
                  <TextInput
                    multiline
                    fullWidth
                    label="Title"
                    source="title"
                    validate={[required(), maxLength(100)]}
                  />
                  <TextInput
                    type="color"
                    fullWidth
                    source="color"
                    validate={[required(), maxLength(10)]}
                  />
                  <TextInput
                    validate={[required()]}
                    source="description"
                    multiline
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
        </SaveContextProvider>
      </Dialog>
    </>
  );
};
