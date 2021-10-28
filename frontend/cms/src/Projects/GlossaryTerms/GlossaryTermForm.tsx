import {
  AutocompleteInput,
  maxLength,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SimpleFormProps,
  TextInput,
} from "react-admin";
import { CustomRichTextInput } from "../../components/CustomRichTextInput";
import { SelectImage } from "../../components/SelectImage";
import { ProjectMediaDialogCreate } from "../ProjectMediaCreate";

export const GlossaryTermForm = (props: Omit<SimpleFormProps, "children">) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;
  const redirect = `/projects/${project}/3`;

  return (
    <SimpleForm {...props} redirect={redirect}>
      <ReferenceInput
        label="Category"
        source="glossary_category"
        reference="glossary-categories"
        filter={{ project }}
        validate={required()}
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput
        multiline
        fullWidth
        source="title"
        validate={[required(), maxLength(100)]}
      />
      <CustomRichTextInput
        validate={[required()]}
        source="description"
        addLabel={false}
      />
      <TextInput fullWidth source="more_info_url" />
      <ReferenceArrayInput
        label="Related terms"
        source="related"
        fullWidth
        reference="glossary-terms"
        filter={{ project }}
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>
      <ProjectMediaDialogCreate project={project} />

      <ReferenceInput
        label="Image"
        source="image"
        reference="media"
        filter={{ project }}
      >
        <SelectImage fileSource="file" titleSource="description" />
      </ReferenceInput>
    </SimpleForm>
  );
};
