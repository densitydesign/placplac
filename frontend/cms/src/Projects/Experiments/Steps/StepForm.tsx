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
  useGetOne,
} from "react-admin";
import { BuilderInput } from "../../../components/BuilderInput";

const StepFormToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar
      style={{ display: "flex", justifyContent: "space-between" }}
      {...props}
    >
      <SaveButton />
      {props.record && props.record.id && (
        <DeleteButton redirect={`/experiments/${props.record.experiment}/3`} />
      )}
    </Toolbar>
  );
};

export const StepForm = (props: Omit<TabbedFormProps, "children">) => {
  const project =
    props.initialValues && "project" in props.initialValues
      ? props.initialValues.project
      : props.record.project;

  const { data, loaded } = useGetOne("projects", project);
  const experiment =
    props.initialValues && "experiment" in props.initialValues
      ? props.initialValues.experiment
      : props.record.experiment;
  const { data: experimentData, loaded: loadedExp } = useGetOne(
    "experiments",
    experiment
  );
  return loaded && data && experimentData && loadedExp ? (
    <TabbedForm {...props} redirect="edit" toolbar={<StepFormToolbar />}>
      <FormTab label="summary">
        <NumberInput
          source="step_number"
          validate={[required()]}
          helperText="The number indicating the order in which the steps are displayed"
        />
        <TextInput
          multiline
          fullWidth
          source="title"
          label="Title"
          helperText="The title of the step"
          validate={[required(), maxLength(255)]}
        />
      </FormTab>
      <FormTab label="content">
        <BuilderInput
          glossaryTermsIds={data.glossaryterm_set}
          referencesIds={experimentData.reference_set}
          source={"content"}
          project={project}
        />
      </FormTab>
    </TabbedForm>
  ) : null;
};
