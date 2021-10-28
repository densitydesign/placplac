import {
  FormTab,
  maxLength,
  NumberInput,
  required,
  TabbedForm,
  TabbedFormProps,
  TextInput,
} from "react-admin";
import { BuilderInput } from "../../../components/BuilderInput";
import { CustomRichTextInput } from "../../../components/CustomRichTextInput";

export const StepForm = (
  props: Omit<TabbedFormProps, "children"> & {
    project: number;
  }
) => {
  const { project } = props;

  return (
    <TabbedForm {...props}>
      <FormTab label="summary">
        <NumberInput source="step_number" validate={[required()]} />
        <TextInput
          multiline
          fullWidth
          source="title"
          validate={[required(), maxLength(255)]}
        />
        <CustomRichTextInput
          project={project}
          source="description"
          addLabel={false}
        />
      </FormTab>
      <FormTab label="content">
        <BuilderInput source={"content"} project={project} />
      </FormTab>
    </TabbedForm>
  );
};
