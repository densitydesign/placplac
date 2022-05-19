import {
  Button,
  FileField,
  FileInput,
  Identifier,
  ImageField,
  ImageInput,
  RecordContextProvider,
  required,
  TextInput,
  useAugmentedForm,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { FieldValues, FormProvider, useFormContext } from 'react-hook-form';
import { Typography, Grid, Switch, FormControlLabel, Box } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { CustomDataProvider } from '../../../dataProvider';
import { useState } from 'react';
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
        notify('Your file has been successfully uploaded!', {
          type: 'success',
        });
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
  const [uploadFromTheInternet, setUploadFromTheInternet] = useState(false);
  return (
    <RecordContextProvider value={{}}>
      <FormProvider {...form}>
        <>
          {type === 'image' ? (
            <>
              {/* <TextInput
                fullWidth
                source="description"
                label="Paste an url from the web"
              />
              <Typography variant="h5" textAlign={'center'}>
                or
              </Typography> */}
              <ImageInput
                helperText={
                  'The maximum accepted size is 4MB, and only image files will be accepted'
                }
                source="file"
                label={' '}
                accept="image/*"
                maxSize={4000000}
                options={{
                  onDropRejected: () =>
                    alert(
                      'Cambiare in: “File rejected. The maximum accepted size for images (.png, .jpg, .gif) is 4MB.”'
                    ),
                }}
                sx={{
                  '& .RaFileInput-dropZone': {
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: '#eeeeee',
                    borderStyle: 'dashed',
                    backgroundColor: '#fafafa',
                  },
                }}
              >
                <ImageField
                  sx={{ '& .RaImageField-image': { maxWidth: '100%' } }}
                  source="src"
                  label={false}
                  title="title"
                />
              </ImageInput>
            </>
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
              options={{
                onDropRejected: () =>
                  alert('The maximum accepted size for videos (.mp4) is 16MB”'),
              }}
            >
              <FileField source="src" title="title" />
            </FileInput>
          )}
          <Box mt={2}>
            <TextInput
              fullWidth
              source="description"
              label="Write the description of the media"
            />
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <ResetSaveButton />
            </Grid>
          </Grid>
        </>
      </FormProvider>
    </RecordContextProvider>
  );
};
