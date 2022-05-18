import {
  Button,
  FileField,
  FileInput,
  Identifier,
  ImageField,
  ImageInput,
  required,
  TextInput,
  useAugmentedForm,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { FieldValues, FormProvider, useFormContext } from 'react-hook-form';
import {
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import IconContentAdd from '@mui/icons-material/FileUpload';
import { useToggler } from '../useToggler';
import { client } from '../dataProvider';

const ResetSaveButton = ({ closeDialog }: { closeDialog: () => void }) => {
  const { reset, handleSubmit } = useFormContext();
  const queryClient = useQueryClient();
  const notify = useNotify();

  const { mutate, isLoading } = useMutation(
    ['project-media'],
    (values: FieldValues) => {
      const formData = new FormData();
      formData.append('file', values.file.rawFile);
      return client('projects/import_project', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    {
      onSuccess: async () => {
        closeDialog();
        reset();
        notify('Project imported!', { type: 'success' });
        queryClient.invalidateQueries('projects');
      },
      onError: () => {
        notify('Errore!', { type: 'error' });
      },
    }
  );
  const onSubmit = handleSubmit((values) => mutate(values));
  return (
    <Button
      variant="contained"
      label="Import project"
      type="button"
      onClick={onSubmit}
      disabled={isLoading}
    />
  );
};

export const ImportProjectButton = () => {
  const { value, setTrue, setFalse } = useToggler();

  const { form } = useAugmentedForm({
    record: {},
    defaultValues: {},
  });

  return (
    <>
      <Button onClick={setTrue} label="Import project">
        <IconContentAdd />
      </Button>
      <Dialog maxWidth="sm" fullWidth open={value}>
        <FormProvider {...form}>
          <DialogContent>
            <FileInput
              validate={required()}
              source="file"
              label={''}
              accept={'.zip'}
              helperText={'Select the project zip file'}
              options={{ onDropRejected: () => alert('File rejected') }}
            >
              <FileField source="src" title="title" label={false} />
            </FileInput>
          </DialogContent>
          <DialogActions>
            <Button label="Cancel" onClick={setFalse} />
            <ResetSaveButton closeDialog={setFalse} />
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};
