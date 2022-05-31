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
  SelectInput,
  ReferenceInput,
  RecordContextProvider,
  useCreate,
  SaveContextProvider,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../useToggler';
import { CustomRichTextInput } from '../components/CustomRichTextInput';
import { FieldValues } from 'react-hook-form';

export const AddGlossaryTermButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [create, { isLoading }] = useCreate();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = (values: FieldValues) =>
    create(
      'glossary-terms',
      {
        data: values,
      },
      {
        onSuccess: (data) => {
          setFalse();
          redirect('edit', '/glossary-terms', data.id);
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
        label="Add glossary term"
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
                  <ReferenceInput
                    source="glossary_category"
                    reference="glossary-categories"
                    filter={{ project }}
                  >
                    <SelectInput
                      optionText="title"
                      label="Category"
                      validate={required()}
                    />
                  </ReferenceInput>
                  <TextInput
                    multiline
                    fullWidth
                    source="title"
                    label="Title"
                    validate={[required(), maxLength(100)]}
                  />
                  <CustomRichTextInput
                    validate={[required()]}
                    source="description"
                    label={false}
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
