import React from 'react';
import {
  FileField,
  FileInput,
  Form,
  Identifier,
  ImageField,
  ImageInput,
  RecordContextProvider,
  required,
  SaveButton,
  SaveButtonProps,
  TextInput,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { FieldValues, useFormContext } from 'react-hook-form';
import { Typography, Grid } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
interface AddMediaFormProps {
  project: Identifier;
  type: 'image' | 'file' | 'video';
}

const ResetSaveButton = (props: SaveButtonProps) => {
  const { reset } = useFormContext();
  const queryClient = useQueryClient();
  const notify = useNotify();

  return (
    <SaveButton
      {...props}
      mutationOptions={{
        onSuccess: () => {
          reset();
          notify('Media uploaded!', { type: 'success' });
          queryClient.invalidateQueries('project-media');
        },
        onError: (error: any) => {
          notify(error.message, { type: 'error' });
        },
      }}
    />
  );
};

export const AddMediaForm = (props: AddMediaFormProps) => {
  const { project, type } = props;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { mutate: onSubmit, isLoading } = useMutation(
    ['project-media'],
    (values: FieldValues) =>
      dataProvider.createMultipart('project-media', {
        data: values,
      })
  );
  return (
    <RecordContextProvider value={{ project, type }}>
      <Form onSubmit={onSubmit}>
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
              <ResetSaveButton type="button" disabled={isLoading} />
            </Grid>
          </Grid>
        </>
      </Form>
    </RecordContextProvider>
  );
};
