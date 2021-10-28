import { Grid } from "@material-ui/core";
import {
  ArrayInput,
  required,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const EditListExperimentSetup = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <TextInput
            validate={required()}
            helperText={false}
            fullWidth
            source={"title"}
          />
        </Grid>
        <Grid item>
          <TextInput
            validate={required()}
            helperText={false}
            fullWidth
            source={"subtitle"}
          />
        </Grid>
        <Grid item>
          <ArrayInput validate={required()} source={"list"}>
            <SimpleFormIterator getItemLabel={() => "-"}>
              <TextInput label={false} multiline fullWidth source="" />
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
      </Grid>
    </>
  );
};
