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
import { Typography, Grid } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { CustomDataProvider } from '../../../dataProvider';
interface AddMediaFormProps {
  project: Identifier;
  type: 'image' | 'file' | 'video';
}

const ResetSaveButton = () => {
  const { reset, handleSubmit } = useFormContext();
  const queryClient = useQueryClient();
  const notify = useNotify();
  const dataProvider = useDataProvider<CustomDataProvider>();

  const { mutate, isLoading } = useMutation(
    ['project-media'],
    (values: FieldValues) => {
      console.log(values);
      return dataProvider.createMultipart('project-media', {
        data: values,
      });
    },
    {
      onSuccess: async () => {
        reset();
        notify('Media uploaded!', { type: 'success' });
        queryClient.invalidateQueries('project-media');
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
      label="Upload media"
      type="button"
      onClick={onSubmit}
      disabled={isLoading}
    />
  );
};

export const AddMediaForm = (props: AddMediaFormProps) => {
  const { project, type } = props;

  const { form } = useAugmentedForm({
    record: { project, type },
    defaultValues: {},
  });

  return (
    <FormProvider {...form}>
      <>
        <Typography variant="h5">Add new file</Typography>

        {type === 'image' ? (
          <ImageInput
            helperText={
              'The maximum accepted size is 4MB, and only image files will be accepted'
            }
            validate={required()}
            source="file"
            label={''}
            accept="image/*"
            maxSize={4000000}
            options={{ onDropRejected: () => alert('File rejected') }}
          >
            <ImageField
              sx={{ '& .RaImageField-image': { maxWidth: '100%' } }}
              source="src"
              title="title"
            />
          </ImageInput>
        ) : (
          <FileInput
            helperText={
              type === 'video'
                ? 'The maximum accepted size is 16MB, and only video files will be accepted.'
                : 'The maximum accepted size is 16MB.'
            }
            validate={required()}
            source="file"
            label={''}
            accept={type === 'video' ? 'video/*' : undefined}
            maxSize={16000000}
            options={{ onDropRejected: () => alert('File rejected') }}
          >
            <FileField source="src" title="title" />
          </FileInput>
        )}

        <TextInput fullWidth source="description" />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <ResetSaveButton />
          </Grid>
        </Grid>
      </>
    </FormProvider>
  );
};
