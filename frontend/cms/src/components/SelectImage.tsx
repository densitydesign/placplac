import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Radio,
} from "@material-ui/core";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";
import { error } from "console";
import React from "react";
import { InputHelperText, Record, useInput } from "react-admin";
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
    <Grid container direction="column">
      <Grid item>
        <FormControl
          component="fieldset"
          error={meta.touched && !!(meta.error || meta.submitError)}
        >
          <FormHelperText>
            <InputHelperText
              touched={meta.touched}
              error={meta.error || meta.submitError}
              helperText={helperText}
            />
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item container direction="row" spacing={2}>
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
    </Grid>
  );
};
