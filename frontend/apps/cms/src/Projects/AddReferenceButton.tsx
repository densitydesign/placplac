import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  Button,
  Form,
  SaveButton,
  useNotify,
  useRecordContext,
  useRedirect,
  RecordContextProvider,
  useCreate,
  required,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../useToggler';
import { CustomRichTextInput } from '../components/CustomRichTextInput';
import { FieldValues } from 'react-hook-form';

export const AddReferenceButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [create, { isLoading }] = useCreate();
  const record = useRecordContext();
  const { id } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = (values: FieldValues) => {
    return create(
      'references',
      { data: values },
      {
        onSuccess: (data) => {
          setFalse();
          redirect('edit', '/references', data.id);
        },
        onError: (error) => {
          notify('ra.page.error', { type: 'error' });
        },
      }
    );
  };

  return (
    <>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={setTrue}
        label="Add reference"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value} disableEnforceFocus>
        <RecordContextProvider value={{ project: id }}>
          <Form onSubmit={onSave}>
            <>
              <DialogContent>
                <CustomRichTextInput
                  source="description"
                  label="Description of reference"
                  small
                  validate={required()}
                />
                <CustomRichTextInput
                  source="in_text_citation"
                  label="In text citation"
                  small
                  validate={required()}
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
