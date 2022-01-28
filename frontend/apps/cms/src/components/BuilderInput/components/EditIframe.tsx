import { Grid } from '@material-ui/core';
import { required, TextInput } from 'react-admin';

export const EditIframe = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <TextInput
          validate={required()}
          helperText={
            'No full html code is required, only the link to the page that will be inserted within the iframe'
          }
          fullWidth
          source={'src'}
        />
        <TextInput
          validate={required()}
          helperText={false}
          fullWidth
          source={'height'}
        />
      </Grid>
    </Grid>
  );
};
