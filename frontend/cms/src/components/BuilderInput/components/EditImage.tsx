import { Grid } from "@material-ui/core";
import { FormDataConsumer, required } from "ra-core";
import {
  BooleanInput,
  CheckboxGroupInput,
  ReferenceInput,
  TextInput,
} from "ra-ui-materialui";

import { OnChange } from "react-final-form-listeners";
import { useForm } from "react-final-form";
import { ProjectMediaDialogCreate } from "../../../Projects/ProjectMediaCreate";
import { SelectImage } from "../../SelectImage";
import { CustomRichTextInput } from "../../CustomRichTextInput";
interface Props {
  project: number;
}
export const EditImage = ({ project }: Props) => {
  const { change } = useForm();
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <BooleanInput
            helperText={false}
            defaultValue={false}
            source={"isWide"}
          />
        </Grid>
        <Grid item>
          <CheckboxGroupInput
            helperText={false}
            source="type"
            label="Include"
            choices={[
              { id: "title", name: "Title" },
              { id: "subtitle", name: "Subtitle" },
              { id: "caption", name: "Caption" },
              { id: "description", name: "Description" },
            ]}
          />
          <OnChange name="type">
            {(value, previous) => {
              !value.includes("title") && change("title", undefined);
              !value.includes("subtitle") && change("subtitle", undefined);
              !value.includes("caption") && change("caption", undefined);
              !value.includes("description") && change("caption", undefined);
            }}
          </OnChange>
        </Grid>

        <Grid item>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.type &&
              formData.type.includes("title") && (
                <TextInput
                  helperText={false}
                  multiline
                  fullWidth
                  source="title"
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
              formData.type.includes("subtitle") && (
                <TextInput
                  helperText={false}
                  multiline
                  fullWidth
                  source="subtitle"
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
              formData.type.includes("caption") && (
                <TextInput
                  helperText={false}
                  multiline
                  fullWidth
                  source="caption"
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
              formData.type.includes("description") && (
                <CustomRichTextInput
                  helperText={false}
                  multiline
                  fullWidth
                  source="description"
                  {...rest}
                />
              )
            }
          </FormDataConsumer>
        </Grid>

        <Grid item>
          <ProjectMediaDialogCreate project={project} />
          <ReferenceInput
            label="Image"
            source="image"
            reference="media"
            filter={{ project }}
            validate={required()}
          >
            <SelectImage fileSource="file" titleSource="description" />
          </ReferenceInput>
        </Grid>
      </Grid>
    </>
  );
};