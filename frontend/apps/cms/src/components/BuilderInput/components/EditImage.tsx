import { Grid } from '@material-ui/core';
import { FormDataConsumer } from 'ra-core';
import { BooleanInput, CheckboxGroupInput, TextInput } from 'ra-ui-materialui';

import { OnChange } from 'react-final-form-listeners';
import { useForm } from 'react-final-form';
import { CustomRichTextInput } from '../../CustomRichTextInput';
import { ReferenceInputImage } from '../../ReferenceInputImage';
interface Props {
  project: number;
}
export const EditImage = ({ project }: Props) => {
  const { change } = useForm();
  return (
    <Grid container direction="column">
      <Grid item>
        <BooleanInput
          helperText={false}
          defaultValue={false}
          source={'isWide'}
        />
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
        <OnChange name="type">
          {(value, previous) => {
            !value.includes('title') && change('title_bi', undefined);
            !value.includes('subtitle') && change('subtitle_bi', undefined);
            !value.includes('caption') && change('caption_bi', undefined);
            !value.includes('description') &&
              change('description_bi', undefined);
          }}
        </OnChange>
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
                source="title_bi"
                label="Title"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
      </Grid>
      <Grid item>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type &&
            formData.type.includes('subtitle') && (
              <TextInput
                helperText={false}
                multiline
                fullWidth
                source="subtitle_bi"
                label="Subtitle"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
      </Grid>
      <Grid item>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type &&
            formData.type.includes('caption') && (
              <CustomRichTextInput
                small
                helperText={false}
                source="caption_bi"
                label="Caption"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
      </Grid>
      <Grid item>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.type &&
            formData.type.includes('description') && (
              <CustomRichTextInput
                helperText={false}
                multiline
                fullWidth
                source="description_bi"
                label="Description"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
      </Grid>

      <Grid item>
        <ReferenceInputImage source="image" project={project} />
      </Grid>
    </Grid>
  );
};
