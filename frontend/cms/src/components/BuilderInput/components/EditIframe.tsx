import { Grid } from "@material-ui/core";
import { required, TextInput } from "react-admin";

export const EditIframe = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <TextInput
            validate={required()}
            helperText={false}
            fullWidth
            source={"src"}
          />
          <TextInput
            validate={required()}
            helperText={false}
            fullWidth
            source={"width"}
          />
          <TextInput
            validate={required()}
            helperText={false}
            fullWidth
            source={"height"}
          />
        </Grid>
      </Grid>
    </>
  );
};
