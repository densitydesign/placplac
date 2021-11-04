import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
} from "@material-ui/core";
import { FieldTitle, InputHelperText, Record } from "react-admin";
import RadioButton from "./RadioButton";
export interface SelectImageProps {
  source?: string;
  choices?: object[];
  fileSource: string;
  titleSource: string;
  record?: Record;
}
export const SelectImage = ({
  choices,
  fileSource,
  titleSource,
  source,
  record,
  input,
  isRequired,
  meta,
  helperText,
  ...rest
}: SelectImageProps & any) => {
  return (
    <FormControl error={meta.touched && !!(meta.error || meta.submitError)}>
      <InputLabel shrink style={{ position: "relative" }}>
        <FieldTitle
          label={rest.label}
          source={source}
          resource={rest.resource}
          isRequired={isRequired}
        />
      </InputLabel>
      <Grid container direction="row" spacing={2}>
        {choices &&
          choices.map((choice: any) => (
            <Grid item key={choice.id}>
              <Grid item container direction="column">
                <Grid item>
                  <Box
                    width="200px"
                    height="200px"
                    borderRadius={10}
                    style={{
                      backgroundImage: `url(${choice[fileSource]})`,
                      backgroundSize: "cover",
                    }}
                  />
                </Grid>
                <Grid item>
                  <RadioButton
                    {...input}
                    choice={choice}
                    optionText={"title"}
                    optionValue={"id"}
                    source={source}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
      <FormHelperText>
        <InputHelperText
          touched={meta.touched}
          error={meta.error || meta.submitError}
          helperText={helperText}
        />
      </FormHelperText>
    </FormControl>
  );
};
