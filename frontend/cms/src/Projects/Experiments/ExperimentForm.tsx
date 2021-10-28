import {
  ArrayInput,
  Button,
  Datagrid,
  FormTab,
  FunctionField,
  maxLength,
  ReferenceArrayField,
  required,
  SimpleFormIterator,
  TabbedForm,
  TabbedFormProps,
  TextField,
  Record,
  TextInput,
  ReferenceInput,
} from "react-admin";
import { BuilderInput } from "../../components/BuilderInput/BuilderInput";
import { CustomRichTextInput } from "../../components/CustomRichTextInput";
import { AddStepButton } from "../AddStepButton";
import ContentCreate from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import { ProjectMediaDialogCreate } from "../ProjectMediaCreate";
import { SelectImage } from "../../components/SelectImage";

export const ExperimentForm = (props: Omit<TabbedFormProps, "children">) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;
  const redirect = `/projects/${project}/2`;
  return (
    <TabbedForm {...props} redirect={redirect}>
      <FormTab label="summary">
        <TextInput
          multiline
          fullWidth
          source="title"
          validate={[required(), maxLength(255)]}
        />
        <TextInput
          multiline
          fullWidth
          source="research_question"
          validate={[maxLength(255)]}
        />
        <CustomRichTextInput
          project={project}
          source="description"
          addLabel={false}
        />
        <ProjectMediaDialogCreate project={project} />
        <ReferenceInput
          label="Image"
          source="cover"
          reference="media"
          filter={{ project }}
        >
          <SelectImage fileSource="file" titleSource="description" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="disclaimers">
        <ArrayInput source="disclaimers">
          <SimpleFormIterator>
            <TextInput multiline source="" hiddenLabel label="" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="context">
        <BuilderInput source={"context"} project={project} />
      </FormTab>
      <FormTab label="experiment_setup">
        <BuilderInput
          possibleColumns={[2, 3, 4]}
          possibleComponents={["image", "listExperimentSetup"]}
          source={"experiment_setup"}
          project={project}
          gap="30px"
        />
      </FormTab>
      <FormTab label="findings">
        <BuilderInput source={"findings"} project={project} />
      </FormTab>
      <FormTab label="steps">
        <AddStepButton />
        <ReferenceArrayField label="" reference="steps" source="step_set">
          <Datagrid>
            <TextField source="title" />
            <FunctionField
              render={(record: Record | undefined) =>
                record && props.record ? (
                  <Button
                    component={Link}
                    to={`/steps/${encodeURIComponent(
                      record.id
                    )}?project=${project}&experiment=${props.record.id}`}
                    label={"ra.action.edit"}
                  >
                    <ContentCreate />
                  </Button>
                ) : null
              }
            />
          </Datagrid>
        </ReferenceArrayField>
      </FormTab>
    </TabbedForm>
  );
};
