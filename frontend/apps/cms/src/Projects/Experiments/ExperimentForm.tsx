import {
  ArrayInput,
  Datagrid,
  FormTab,
  maxLength,
  ReferenceArrayField,
  required,
  SimpleFormIterator,
  TabbedForm,
  TabbedFormProps,
  TextField,
  TextInput,
  DeleteButton,
  SaveButton,
  Toolbar,
  ToolbarProps,
  EditButton,
  useRecordContext,
  FunctionField,
} from 'react-admin';
import { BuilderInput } from '../../components/BuilderInput/BuilderInput';
import { CustomRichTextInput } from '../../components/CustomRichTextInput';
import { AddStepButton } from './AddStepButton';

import { ReferenceInputImage } from '../../components/ReferenceInputImage';
import { Tabs } from '../../components/Tabs';
import { SelectFile } from '../../components/SelectFile';
import { AddExperimentAdditionalMaterialButton } from './AddExperimentAdditionalMaterialButton';
import { CustomFileField } from '../../components/CustomFileField';
import { ProjectContextProvider } from '../../contexts/project-context';
import { ReorderStepsButton } from './ReorderStepsButton';
import { Step } from '../../types';

const ExperimentFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && record.id && (
        <DeleteButton redirect={`/projects/${record.project}/1`} />
      )}
    </Toolbar>
  );
};
export const ExperimentForm = (props: Omit<TabbedFormProps, 'children'>) => {
  const record = useRecordContext();
  const projectId =
    props.defaultValues && 'project' in props.defaultValues
      ? props.defaultValues.project
      : record?.project;

  return (
    <ProjectContextProvider project={projectId}>
      <TabbedForm
        {...props}
        tabs={<Tabs />}
        toolbar={<ExperimentFormToolbar />}
      >
        <FormTab label="summary">
          <TextInput
            multiline
            fullWidth
            source="title"
            label="Title (200)"
            placeholder="a short title representative of the experiment"
            helperText="The title of the experiment"
            validate={[required(), maxLength(200)]}
          />
          <CustomRichTextInput
            fullWidth
            source="research_question"
            label="Research question (150)"
            placeholder="What question are you trying to answer through this experiment"
            helperText="The research question of the experiment"
            small
            onlyStyle
          />
          <CustomRichTextInput
            fullWidth
            source="description"
            placeholder="What question are you trying to answer through this experiment"
            helperText="A breif description of the experiment (this will be the experiment description in the main project page)"
            small
          />
          <ArrayInput source="tags" helperText="The tags of the experiment">
            <SimpleFormIterator>
              <TextInput
                margin="none"
                multiline
                source=""
                hiddenLabel
                label=""
                variant="standard"
                helperText={false}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <SelectFile
            type="file"
            label={'Pdf report'}
            source={'pdf_report'}
            project={projectId}
            helperText="Click the right button to choose a pdf file from the library"
          />
          <ReferenceInputImage label="Cover" source="cover" />
          {record?.id && (
            <>
              <AddExperimentAdditionalMaterialButton />
              <ReferenceArrayField
                label="Additional material"
                reference="experiment-additional-material"
                source="experimentadditionalmaterial_set"
                fullWidth
              >
                <Datagrid>
                  <CustomFileField source="file" title="name" />
                  <TextField source="file" label={'url'} />
                  <DeleteButton redirect={false} mutationMode="optimistic" />
                </Datagrid>
              </ReferenceArrayField>
            </>
          )}
        </FormTab>

        {record?.id && (
          <FormTab label="context">
            <BuilderInput canDivided={false} source={'context'} />
          </FormTab>
        )}

        {record?.id && (
          <FormTab label="experiment setup">
            <BuilderInput
              canDivided={false}
              possibleComponents={[
                'image',
                'listExperimentSetup',
                'disclaimer',
              ]}
              source={'experiment_setup'}
            />
          </FormTab>
        )}

        {record?.id && (
          <FormTab label="steps">
            <AddStepButton />
            <ReferenceArrayField
              label=""
              reference="steps"
              source="step_set"
              fullWidth
              sort={{ field: 'step_number', order: 'ASC' }}
            >
              <Datagrid>
                <FunctionField
                  label="Title"
                  render={(record: Step) => (
                    <EditButton
                      variant="text"
                      record={record}
                      label={record.title}
                    />
                  )}
                />
                <TextField sortable={false} source="step_number" />
                <ReorderStepsButton />
                <DeleteButton redirect={false} mutationMode="optimistic" />
              </Datagrid>
            </ReferenceArrayField>
          </FormTab>
        )}

        {record?.id && (
          <FormTab label="findings">
            <BuilderInput canDivided={false} source={'findings'} />
          </FormTab>
        )}
      </TabbedForm>
    </ProjectContextProvider>
  );
};
