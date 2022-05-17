import { Grid } from '@mui/material';
import { useEffect } from 'react';
import {
  BooleanInput,
  CheckboxGroupInput,
  FormDataConsumer,
  TextInput,
} from 'react-admin';

import { useForm, useFormContext } from 'react-hook-form';

import { CustomRichTextInput } from '../../CustomRichTextInput';
import { ReferenceInputImage } from '../../ReferenceInputImage';
interface Props {
  project: number | string;
}

const RTEDescription = () => {
  const { watch } = useFormContext();

  return watch('type').includes('description') ? (
    <CustomRichTextInput
      helperText={false}
      fullWidth
      source="description"
      label="Description"
    />
  ) : null;
};

const RTECaption = () => {
  const { watch } = useFormContext();

  return watch('type').includes('caption') ? (
    <CustomRichTextInput
      helperText={false}
      fullWidth
      source="caption"
      label="Caption"
    />
  ) : null;
};
export const EditImage = ({ project }: Props) => {
  const { setValue, watch } = useFormContext();
  const type = watch('type');
  useEffect(() => {
    !type.includes('title') && setValue('title', undefined);
    !type.includes('subtitle') && setValue('subtitle', undefined);
    !type.includes('caption') && setValue('caption', undefined);
    !type.includes('description') && setValue('description', undefined);
  }, [type]);
  return (
    <Grid container direction="column">
      <Grid item container columnGap={2} alignItems="center">
        <Grid item>
          <ReferenceInputImage source="image" />
        </Grid>
        <Grid item xs>
          <BooleanInput
            helperText={false}
            defaultValue={false}
            source={'isWide'}
          />
        </Grid>
      </Grid>
      <Grid item>
        <CheckboxGroupInput
          helperText={false}
          source="type"
          label="Include"
          choices={[
            { id: 'title', name: 'Title' },
            { id: 'subtitle', name: 'Subtitle' },
            { id: 'caption', name: 'Caption' },
            { id: 'description', name: 'Description' },
          ]}
        />
      </Grid>

      <Grid item>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type &&
            formData.type.includes('title') && (
              <TextInput
                helperText={false}
                multiline
                fullWidth
                source="title"
                label="Title"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
      </Grid>
      <Grid item>
        <FormDataConsumer>
          {({ formData, getSource, ...rest }) =>
            formData.type &&
            formData.type.includes('subtitle') && (
              <TextInput
                helperText={false}
                multiline
                fullWidth
                source="subtitle"
                label="Subtitle"
              />
            )
          }
        </FormDataConsumer>
      </Grid>
      <Grid item>
        <RTECaption />
      </Grid>
      <Grid item>
        <RTEDescription />
      </Grid>
    </Grid>
  );
};
