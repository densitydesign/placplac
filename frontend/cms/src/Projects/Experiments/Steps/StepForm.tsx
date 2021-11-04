import {
  DeleteButton,
  FormTab,
  maxLength,
  NumberInput,
  required,
  SaveButton,
  TabbedForm,
  TabbedFormProps,
  TextInput,
  Toolbar,
  ToolbarProps,
} from "react-admin";
import { BuilderInput } from "../../../components/BuilderInput";
import { CustomRichTextInput } from "../../../components/CustomRichTextInput";

const StepFormToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar
      style={{ display: "flex", justifyContent: "space-between" }}
      {...props}
    >
      <SaveButton />
      {props.record && props.record.id && (
        <DeleteButton redirect={`/experiments/${props.record.experiment}/5`} />
      )}
    </Toolbar>
  );
};

export const StepForm = (props: Omit<TabbedFormProps, "children">) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;

  return (
    <TabbedForm {...props} redirect="edit" toolbar={<StepFormToolbar />}>
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
