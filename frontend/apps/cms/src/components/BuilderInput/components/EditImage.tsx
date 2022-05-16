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
  project: number;
  glossaryTermsIds: number[];
  referencesIds: number[];
}

interface RTEProps {
  glossaryTermsIds: number[];
  referencesIds: number[];
}
const RTEDescription = (props: RTEProps) => {
  const { watch } = useFormContext();

  return watch('type').includes('description') ? (
    <CustomRichTextInput
      helperText={false}
      fullWidth
      source="description"
      label="Description"
      {...props}
    />
  ) : null;
};

const RTECaption = (props: RTEProps) => {
  const { watch } = useFormContext();

  return watch('type').includes('caption') ? (
    <CustomRichTextInput
      helperText={false}
      fullWidth
      source="caption"
      label="Caption"
      {...props}
    />
  ) : null;
};
export const EditImage = ({
  project,
  referencesIds,
  glossaryTermsIds,
}: Props) => {
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
          <ReferenceInputImage source="image" project={project} />
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
        <RTECaption
          referencesIds={referencesIds}
          glossaryTermsIds={glossaryTermsIds}
        />
      </Grid>
      <Grid item>
        <RTEDescription
          referencesIds={referencesIds}
          glossaryTermsIds={glossaryTermsIds}
        />
      </Grid>
    </Grid>
  );
};
