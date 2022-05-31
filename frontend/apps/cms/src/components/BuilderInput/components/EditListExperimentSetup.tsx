import { Grid } from '@mui/material';
import {
  ArrayInput,
  required,
  SimpleFormIterator,
  TextInput,
} from 'react-admin';

export const EditListExperimentSetup = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <TextInput
          validate={required()}
          helperText={false}
          fullWidth
          source={'title_bi'}
          label="Title"
        />
      </Grid>
      <Grid item>
        <TextInput
          validate={required()}
          helperText={false}
          fullWidth
          source={'subtitle_bi'}
          label="Subtitle"
        />
      </Grid>
      <Grid item>
        <ArrayInput label="List" validate={required()} source={'list_bi'}>
          <SimpleFormIterator getItemLabel={() => '-'}>
            <TextInput label={false} multiline fullWidth source="" />
          </SimpleFormIterator>
        </ArrayInput>
      </Grid>
    </Grid>
  );
};
