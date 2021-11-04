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
import { CustomRichTextInput } from "../components/CustomRichTextInput";
import { AddExperimentButton } from "./AddExperimentButton";
import { AddGlossaryTermButton } from "./AddGlossaryTermButton";

export const ProjectForm = (props: Omit<TabbedFormProps, "children">) => {
  return (
    <TabbedForm {...props}>
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

        <CustomRichTextInput small source="short_description" />
        <CustomRichTextInput source="long_description" />
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
              <EditButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
    </TabbedForm>
  );
};
