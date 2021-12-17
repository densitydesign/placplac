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
  DeleteButton,
  SaveButton,
  Toolbar,
  ToolbarProps,
  EditButton,
  RichTextField,
  useGetOne,
} from "react-admin";
import { BuilderInput } from "../../components/BuilderInput/BuilderInput";
import { CustomRichTextInput } from "../../components/CustomRichTextInput";
import { AddStepButton } from "./AddStepButton";

import { ReferenceInputImage } from "../../components/ReferenceInputImage";
import { Tabs } from "../../components/Tabs";
import { AddReferenceButton } from "../AddReferenceButton";

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
  const { data, loaded } = useGetOne("projects", project);
  return loaded && data ? (
    <TabbedForm
      {...props}
      tabs={<Tabs />}
      redirect="edit"
      toolbar={<ExperimentFormToolbar />}
      margin="dense"
    >
      <FormTab label="summary">
        <TextInput
          multiline
          fullWidth
          source="title"
          label="Title (70)"
          placeholder="a short title representative of the experiment"
          helperText="The title of the experiment"
          validate={[required(), maxLength(255)]}
        />
        <CustomRichTextInput
          multiline
          fullWidth
          source="research_question"
          label="Research question (150)"
          placeholder="What question are you trying to answer through this experiment"
          helperText="The research question of the experiment"
          small
          onlyStyle
        />
        <CustomRichTextInput
          glossaryTermsIds={data.glossaryterm_set}
          referencesIds={props.record.reference_set}
          source="description"
          label="Description (400)"
          placeholder="What question are you trying to answer through this experiment"
          helperText="A breif description of the experiment (this will be the experiment description in the main project page)"
          addLabel={false}
          small
        />
        <ArrayInput source="tags" helperText="The tags of the experiment">
          <SimpleFormIterator>
            <TextInput
              margin="none"
              multiline
              source=""
              hiddenLabel
              label=""
              variant="standard"
              helperText={false}
            />
          </SimpleFormIterator>
        </ArrayInput>

        <ReferenceInputImage label="Cover" source="cover" project={project} />
      </FormTab>

      {props.record.id && (
        <FormTab label="context">
          <BuilderInput
            glossaryTermsIds={data.glossaryterm_set}
            referencesIds={props.record?.reference_set}
            source={"context"}
            project={project}
          />
        </FormTab>
      )}

      {props.record.id && (
        <FormTab label="experiment setup">
          <BuilderInput
            glossaryTermsIds={data.glossaryterm_set}
            referencesIds={props.record.reference_set}
            possibleColumns={[2, 3, 4]}
            possibleComponents={["image", "listExperimentSetup"]}
            source={"experiment_setup"}
            project={project}
          />
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
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}

      {props.record.id && (
        <FormTab label="findings">
          <BuilderInput
            glossaryTermsIds={data.glossaryterm_set}
            referencesIds={props.record?.reference_set}
            source={"findings"}
            project={project}
          />
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="References">
          <AddReferenceButton refersTo="experiment" />

          <ReferenceArrayField
            label="References"
            addLabel={false}
            reference="references"
            source="reference_set"
            fullWidth
          >
            <Datagrid>
              <RichTextField stripTags source="description" />
              <EditButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
    </TabbedForm>
  ) : null;
};
