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
} from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import IconContentAdd from '@material-ui/icons/Add';
import { useToggler } from '../useToggler';

export const AddGlossaryCategoryButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = ({ title_cat, ...values }: Partial<Record>) =>
    mutate(
      {
        type: 'create',
        resource: 'glossary-categories',
        payload: {
          data: {
            title: title_cat,
            color: values.color,
            description: values.description,
            project,
          },
        },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          redirect('edit', '/glossary-categories', data.id);
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
        label="Add glossary category"
      >
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormWithRedirect
          resource="glossary-categories"
          initialValues={{ project }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <TextInput
                  multiline
                  fullWidth
                  label="Title"
                  source="title_cat"
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
