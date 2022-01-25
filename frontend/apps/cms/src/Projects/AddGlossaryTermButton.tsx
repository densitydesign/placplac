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
  useRedirect,
  required,
  maxLength,
  SelectInput,
  ReferenceInput,
} from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import IconContentAdd from '@material-ui/icons/Add';
import { useToggler } from '../useToggler';
import { CustomRichTextInput } from '../components/CustomRichTextInput';

export const AddGlossaryTermButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = ({ title_term, ...values }: Partial<Record>) =>
    mutate(
      {
        type: 'create',
        resource: 'glossary-terms',
        payload: {
          data: {
            glossary_category: values.glossary_category,
            title: title_term,
            description: values.description,
            project,
          },
        },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          redirect('edit', '/glossary-terms', data.id);
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
        label="Add glossary term"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="glossary-terms"
          initialValues={{ project }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <ReferenceInput
                  label="Category"
                  source="glossary_category"
                  reference="glossary-categories"
                  filter={{ project }}
                  validate={required()}
                >
                  <SelectInput optionText="title" />
                </ReferenceInput>
                <TextInput
                  multiline
                  fullWidth
                  source="title_term"
                  label="Title"
                  validate={[required(), maxLength(100)]}
                />
                <CustomRichTextInput
                  validate={[required()]}
                  source="description"
                  addLabel={false}
                />
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
