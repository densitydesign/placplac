import { Dialog, DialogActions, DialogContent } from '@mui/material';
import {
  AutocompleteInput,
  Button,
  Form,
  ReferenceInput,
  SaveButton,
  useNotify,
  useRecordContext,
  SelectInput,
  useRefresh,
  useCreate,
  RecordContextProvider,
  SaveContextProvider,
} from 'react-admin';
import IconCancel from '@mui/icons-material/Cancel';
import IconContentAdd from '@mui/icons-material/Add';
import { useToggler } from '../useToggler';
import { FieldValues } from 'react-hook-form';
import { USER_LEVEL_CHOICES } from '../choices';

export const AddCollaboratorButton = () => {
  const { value, setTrue, setFalse } = useToggler();
  const record = useRecordContext();
  const { id: project } = record;
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();

  const onSubmit = (values: FieldValues) =>
    create(
      'project-collaborators',
      { data: values },
      {
        onSuccess: (data) => {
          refresh();
          setFalse();
        },
        onError: (error) => {
          console.log(error);
          notify('ra.page.error', { type: 'error' });
        },
      }
    );
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
        <SaveContextProvider
          value={{
            saving: isLoading,
          }}
        >
          <RecordContextProvider value={{ project }}>
            <Form onSubmit={onSubmit}>
              <>
                <DialogContent>
                  <ReferenceInput reference="users" source="user_id">
                    <AutocompleteInput optionText="email" />
                  </ReferenceInput>
                  <SelectInput
                    defaultValue="2"
                    fullWidth
                    choices={USER_LEVEL_CHOICES}
                    source="level"
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
