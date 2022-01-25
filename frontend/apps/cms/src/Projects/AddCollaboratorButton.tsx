import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import {
  AutocompleteInput,
  Button,
  FormWithRedirect,
  ReferenceInput,
  SaveButton,
  useMutation,
  useNotify,
  useRecordContext,
  SelectInput,
  useRefresh,
} from 'react-admin';
import IconCancel from '@material-ui/icons/Cancel';
import IconContentAdd from '@material-ui/icons/Add';
import { useToggler } from '../useToggler';

export const AddCollaboratorButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const [mutate, { loading }] = useMutation();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const refresh = useRefresh();
  return (
    <>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={setTrue}
        label="Add collaborator"
      >
        <IconContentAdd />
      </Button>
      <Dialog open={value}>
        <FormWithRedirect
          resource="project-collaborators"
          initialValues={{ project }}
          save={(values) => {
            mutate(
              {
                type: 'create',
                resource: 'project-collaborators',
                payload: { data: values },
              },
              {
                onSuccess: (data) => {
                  refresh();
                  setFalse();
                },
                onFailure: (error) => {
                  console.log(error);
                  notify('ra.page.error', 'error');
                },
              }
            );
          }}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <ReferenceInput reference="users" source="user_id">
                  <AutocompleteInput optionText="email" />
                </ReferenceInput>
                <SelectInput
                  defaultValue="2"
                  fullWidth
                  choices={[
                    { name: 'Author', id: '1' },
                    { name: 'Collaborator', id: '2' },
                  ]}
                  source="level"
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
