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
    <TabbedForm tabs={<Tabs />} {...props} redirect="edit">
      <FormTab label="summary">
        <SelectInput
          defaultValue="2"
          choices={[
            { name: "Published", id: "1" },
            { name: "Draft", id: "2" },
          ]}
          source="status"
        />
        <TextInput
          source="title"
          fullWidth
          validate={[required(), maxLength(255)]}
        />

        <CustomRichTextInput
          label="Description"
          small
          source="short_description"
        />
        <CustomRichTextInput
          label="About the project"
          source="long_description"
        />
      </FormTab>

      {props.record.id && (
        <FormTab label="Experiments">
          <CustomRichTextInput
            source="experiments_description"
            addLabel={false}
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
