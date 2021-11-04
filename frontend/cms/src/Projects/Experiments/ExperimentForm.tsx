import {
  ArrayInput,
  Datagrid,
  FormTab,
  maxLength,
  ReferenceArrayField,
  required,
  SimpleFormIterator,
  TabbedForm,
  TabbedFormProps,
  TextField,
  TextInput,
  ReferenceInput,
  DeleteButton,
  SaveButton,
  Toolbar,
  ToolbarProps,
  EditButton,
} from "react-admin";
import { BuilderInput } from "../../components/BuilderInput/BuilderInput";
import { CustomRichTextInput } from "../../components/CustomRichTextInput";
import { AddStepButton } from "./AddStepButton";

import { ProjectMediaDialogCreate } from "../ProjectMediaCreate";
import { SelectImage } from "../../components/SelectImage";

const ExperimentFormToolbar = (props: ToolbarProps) => (
  <Toolbar
    style={{ display: "flex", justifyContent: "space-between" }}
    {...props}
  >
    <SaveButton />
    {props.record && props.record.id && (
      <DeleteButton redirect={`/projects/${props.record.project}/1`} />
    )}
  </Toolbar>
);
export const ExperimentForm = (props: Omit<TabbedFormProps, "children">) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;

  return (
    <TabbedForm {...props} redirect="edit" toolbar={<ExperimentFormToolbar />}>
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
          label="Cover image"
          source="cover"
          reference="media"
          filter={{ project }}
        >
          <SelectImage fileSource="file" titleSource="description" />
        </ReferenceInput>
      </FormTab>
      {props.record.id && (
        <FormTab label="disclaimers">
          <ArrayInput source="disclaimers">
            <SimpleFormIterator>
              <TextInput multiline source="" hiddenLabel label="" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="context">
          <BuilderInput source={"context"} project={project} />
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="experiment_setup">
          <BuilderInput
            possibleColumns={[2, 3, 4]}
            possibleComponents={["image", "listExperimentSetup"]}
            source={"experiment_setup"}
            project={project}
            gap="30px"
          />
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="findings">
          <BuilderInput source={"findings"} project={project} />
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="steps">
          <AddStepButton />
          <ReferenceArrayField
            label=""
            reference="steps"
            source="step_set"
            fullWidth
          >
            <Datagrid>
              <TextField source="title" />
              <EditButton />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
    </TabbedForm>
  );
};
