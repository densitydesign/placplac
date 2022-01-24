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
} from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import IconContentAdd from '@material-ui/icons/Add';
import { useToggler } from '../useToggler';

export const AddExperimentButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const redirect = useRedirect();
  const onSave = (values: Partial<Record>) =>
    mutate(
      {
        type: 'create',
        resource: 'experiments',
        payload: {
          data: { title: values.titleProject, project: values.project },
        },
      },
      {
        onSuccess: ({ data }) => {
          setFalse();
          redirect('edit', '/experiments', data.id);
        },
        onFailure: (error) => {
          notify('ra.page.error', 'error');
        },
      }
    );
  console.log(project);
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
        <FormWithRedirect
          resource="experiments"
          initialValues={{ project }}
          save={onSave}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <TextInput
                  fullWidth
                  multiline
                  validate={[required()]}
                  source="titleProject"
                  label="Title (70)"
                  placeholder="a short title representative of the experiment"
                  helperText="The title of the experiment"
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
