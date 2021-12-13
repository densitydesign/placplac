import {
  Datagrid,
  DeleteButton,
  EditButton,
  FormTab,
  maxLength,
  ReferenceArrayField,
  required,
  SelectInput,
  TabbedForm,
  TabbedFormProps,
  TextField,
  TextInput,
} from "react-admin";
import { CustomFileField } from "../components/CustomFileField";
import { CustomRichTextInput } from "../components/CustomRichTextInput";
import { Tabs } from "../components/Tabs";
import { AddCollaboratorButton } from "./AddCollaboratorButton";
import { AddExperimentButton } from "./AddExperimentButton";
import { AddGlossaryTermButton } from "./AddGlossaryTermButton";

export const ProjectForm = (props: Omit<TabbedFormProps, "children">) => {
  return (
    <TabbedForm tabs={<Tabs />} {...props} redirect="edit" margin="dense">
      <FormTab label="summary">
        <SelectInput
          defaultValue="2"
          choices={[
            { name: "Published", id: "1" },
            { name: "Draft", id: "2" },
          ]}
          source="status"
          helperText="Is the project ready?"
        />
        <TextInput
          placeholder="Place your project description here. A good idea is to fill this area with the main concept of the project."
          source="title"
          label="Title (100)"
          fullWidth
          validate={[required(), maxLength(255)]}
          helperText="The project title"
        />

        <TextInput
          fullWidth
          placeholder="A good idea is to fill this area with a short but effective description"
          label="Description (255)"
          source="short_description"
          helperText={"A small summary description"}
        />
        <CustomRichTextInput
          placeholder="A good idea is to fill this area with the main concept of the project."
          helperText={"Describe the project"}
          label="About the project"
          source="long_description"
        />
      </FormTab>

      {props.record.id && (
        <FormTab label="Experiments">
          <CustomRichTextInput
            source="experiments_description"
            helperText={"Describe what the experiments consist of"}
            placeholder="Describe briefly the experiments"
            small
          />
          <AddExperimentButton />
          <ReferenceArrayField
            label=""
            reference="experiments"
            source="experiment_set"
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
        <FormTab label="Glossary">
          <AddGlossaryTermButton />
          <ReferenceArrayField
            label=""
            reference="glossary-terms"
            source="glossaryterm_set"
            fullWidth
          >
            <Datagrid>
              <TextField source="title" />
              <TextField source="category_title" />
              <EditButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="Media">
          {/* <AddGlossaryTermButton /> */}
          <ReferenceArrayField
            label=""
            reference="media"
            source="projectmedia_set"
            fullWidth
          >
            <Datagrid>
              <CustomFileField source="file" title="name" />
              <TextField source="type" />
              <TextField source="description" />
              <EditButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
      {props.record.id && (
        <FormTab label="Collaborators">
          <AddCollaboratorButton />
          <ReferenceArrayField
            label=""
            reference="project-collaborators"
            source="projectuser_set"
            fullWidth
          >
            <Datagrid>
              <TextField source="user" />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
    </TabbedForm>
  );
};
