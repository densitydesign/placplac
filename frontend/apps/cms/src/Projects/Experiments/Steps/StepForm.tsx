import { ProjectContextProvider } from '../../../contexts/project-context';
import {
  Datagrid,
  DeleteButton,
  FormTab,
  maxLength,
  NumberInput,
  ReferenceArrayField,
  required,
  SaveButton,
  TabbedForm,
  TabbedFormProps,
  TextField,
  TextInput,
  Toolbar,
  ToolbarProps,
  useGetOne,
  useRecordContext,
} from 'react-admin';
import { BuilderInput } from '../../../components/BuilderInput';
import { CustomFileField } from '../../../components/CustomFileField';
import { AddStepDownloadButton } from './AddStepDownloadButton';
import { EditStepDownloadButton } from './EditStepDownloadButton';

const StepFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();

  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && record.id && (
        <DeleteButton redirect={`/experiments/${record.experiment}/3`} />
      )}
    </Toolbar>
  );
};

export const StepForm = (props: Omit<TabbedFormProps, 'children'>) => {
  const record = useRecordContext();

  const project =
    props.defaultValues && 'project' in props.defaultValues
      ? props.defaultValues.project
      : record?.project;

  return (
    <ProjectContextProvider project={project}>
      <TabbedForm {...props} redirect="edit" toolbar={<StepFormToolbar />}>
        <FormTab label="summary">
          {/* <NumberInput
            source="step_number"
            validate={[required()]}
            helperText="The number indicating the order in which the steps are displayed"
          /> */}
          <TextInput
            multiline
            fullWidth
            source="title"
            label="Title"
            helperText="The title of the step"
            validate={[required(), maxLength(255)]}
          />
          <AddStepDownloadButton />
          <ReferenceArrayField
            label="Downloads"
            reference="step-downloads"
            source="stepdownload_set"
            fullWidth
          >
            <Datagrid>
              <CustomFileField source="file" title="name" />
              <TextField source="title" label="Download title" />
              <TextField source="file" label={'url'} />
              <EditStepDownloadButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
        <FormTab label="content">
          <BuilderInput isStep canDivided={true} source={'content'} />
        </FormTab>
      </TabbedForm>
    </ProjectContextProvider>
  );
};
