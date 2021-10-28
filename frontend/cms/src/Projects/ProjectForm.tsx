import {
  Datagrid,
  EditButton,
  FormTab,
  maxLength,
  ReferenceArrayField,
  required,
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
        <TextInput source="title" validate={[required(), maxLength(255)]} />
        <CustomRichTextInput
          source="short_description"
          validate={required()}
          addLabel={false}
        />
      </FormTab>

      <FormTab label="Full description">
        <CustomRichTextInput
          source="long_description"
          validate={required()}
          addLabel={false}
        />
      </FormTab>
      <FormTab label="Experiments">
        <CustomRichTextInput
          source="experiments_description"
          validate={required()}
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
          </Datagrid>
        </ReferenceArrayField>
      </FormTab>
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
          </Datagrid>
        </ReferenceArrayField>
      </FormTab>
    </TabbedForm>
  );
};
