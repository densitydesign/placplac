import {
  Button,
  FileField,
  FileInput,
  Identifier,
  ImageField,
  ImageInput,
  RecordContextProvider,
  required,
  SaveContextProvider,
  TextInput,
  useAugmentedForm,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { FieldValues, FormProvider, useFormContext } from 'react-hook-form';
import { Typography, Grid, Box } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { CustomDataProvider } from '../../../dataProvider';
import { useState } from 'react';
import { FormSaveButton } from '../../FormSaveButton';
interface AddMediaFormProps {
  project: Identifier;
  type: 'image' | 'file' | 'video';
}

export const AddMediaForm = (props: AddMediaFormProps) => {
  const { project, type } = props;
  const queryClient = useQueryClient();
  const notify = useNotify();
  const dataProvider = useDataProvider<CustomDataProvider>();

  const { mutate, isLoading } = useMutation(
    ['project-media'],
    (values: FieldValues) => {
      return dataProvider.createMultipart('project-media', {
        data: values,
      });
    },
    {
      onSuccess: async () => {
        form.reset();
        notify('Your file has been successfully uploaded!', {
          type: 'success',
        });
        queryClient.invalidateQueries('project-media');
      },
      onError: () => {
        notify('Error, the file could have a wrong format!', { type: 'error' });
      },
    }
  );
  const { form } = useAugmentedForm({
    record: { project, type },
    defaultValues: {},
    validate: (data) => {
      const errors: any = {};
      if (!data.file_url && !data.file) {
        errors.file_url = 'Drop a file or paste the url!';
      }
      return errors;
    },
    onSubmit: (values) => mutate(values),
  });
  return (
    <SaveContextProvider
      value={{
        saving: isLoading,
        save: form.handleSubmit((values) => mutate(values)),
      }}
    >
      <RecordContextProvider value={{}}>
        <FormProvider {...form}>
          <>
            {type === 'image' ? (
              <>
                <TextInput
                  fullWidth
                  source="file_url"
                  label="Paste an url from the web"
                />
                <Typography variant="h5" textAlign={'center'}>
                  or
                </Typography>
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
                    alert(
                      'The maximum accepted size for videos (.mp4) is 16MB”'
                    ),
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
                <FormSaveButton label="Upload media" type="button" />
              </Grid>
            </Grid>
          </>
        </FormProvider>
      </RecordContextProvider>
    </SaveContextProvider>
  );
};
