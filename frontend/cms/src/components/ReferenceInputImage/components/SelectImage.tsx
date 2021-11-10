import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FieldTitle, InputHelperText, Record } from "react-admin";
import RadioButton from "../../RadioButton";
import { ProjectMediaDialogCreate } from "./ProjectMediaCreate";
export interface SelectImageProps {
  source?: string;
  choices?: object[];
  fileSource: string;
  titleSource: string;
  record?: Record;
  project: number;
  handleChange: () => void;
}

const useStyles = makeStyles(() => ({
  blackLayer: {
    opacity: 0.5,
    backgroundColor: "black",
    "&:hover": { opacity: 0 },
  },
}));

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
  project,
  handleChange,
  ...rest
}: SelectImageProps & any) => {
  const classes = useStyles();
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
        <Grid item>
          <Box
            boxShadow="2"
            width="200px"
            height="200px"
            borderRadius={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ProjectMediaDialogCreate
              onChange={handleChange}
              source={source}
              project={project}
            />
          </Box>
        </Grid>
        {choices &&
          choices.map((choice: any) => (
            <Grid item key={choice.id}>
              <Grid item container direction="column" alignItems="center">
                <Grid item>
                  <Box
                    width="200px"
                    height="200px"
                    display="block"
                    position="relative"
                    overflow="hidden"
                    boxShadow="2"
                    borderRadius={10}
                  >
                    <Box zIndex={10} position="absolute" top={"16px"} right={0}>
                      <RadioButton
                        {...input}
                        choice={choice}
                        optionText={"title"}
                        optionValue={"id"}
                        source={source}
                      />
                    </Box>
                    <Box
                      className={classes.blackLayer}
                      zIndex={5}
                      position="absolute"
                      width="200px"
                      height="200px"
                    ></Box>
                    <Box
                      zIndex={1}
                      width="200px"
                      height="200px"
                      style={{
                        backgroundImage: `url(${choice[fileSource]})`,
                        backgroundSize: "cover",
                      }}
                      position="absolute"
                    ></Box>
                  </Box>
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
