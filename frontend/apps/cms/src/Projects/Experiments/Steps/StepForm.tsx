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

  const { data, isLoading } = useGetOne('projects', { id: project });
  const experiment =
    props.defaultValues && 'experiment' in props.defaultValues
      ? props.defaultValues.experiment
      : record?.experiment;
  const { data: experimentData, isLoading: isLoadingExp } = useGetOne(
    'experiments',
    { id: experiment }
  );
  return !isLoading && data && experimentData && !isLoadingExp ? (
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
        <BuilderInput
          isStep
          canDivided={true}
          glossaryTermsIds={(data as any).glossaryterm_set}
          referencesIds={(experimentData as any).reference_set}
          source={'content'}
          project={project}
        />
      </FormTab>
    </TabbedForm>
  ) : null;
};
