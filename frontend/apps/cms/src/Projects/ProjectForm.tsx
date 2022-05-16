import { Typography } from '@mui/material';
import {
  ArrayInput,
  Datagrid,
  DeleteButton,
  EditButton,
  FormDataConsumer,
  FormTab,
  FunctionField,
  maxLength,
  RaRecord,
  ReferenceArrayField,
  ReferenceManyField,
  required,
  RichTextField,
  SaveButton,
  SelectField,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TabbedFormProps,
  TextField,
  TextInput,
  Toolbar,
  ToolbarProps,
  useRecordContext,
} from 'react-admin';
import { CustomFileField } from '../components/CustomFileField';
import { CustomRichTextInput } from '../components/CustomRichTextInput';
import { ReferenceInputImage } from '../components/ReferenceInputImage';
import { Tabs } from '../components/Tabs';
import { AddCollaboratorButton } from './AddCollaboratorButton';
import { AddExperimentButton } from './AddExperimentButton';
import { AddGlossaryCategoryButton } from './AddGlossaryCategoryButton';
import { AddGlossaryTermButton } from './AddGlossaryTermButton';
import { AddReferenceButton } from './AddReferenceButton';

const ProjectFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && record.id && record.user_level === '1' && <DeleteButton />}
    </Toolbar>
  );
};
export const ProjectForm = () => {
  const record = useRecordContext();
  return (
    <TabbedForm tabs={<Tabs />} toolbar={<ProjectFormToolbar />}>
      <FormTab label="summary">
        <SelectInput
          defaultValue="2"
          choices={[
            { name: 'Published', id: '1' },
            { name: 'Draft', id: '2' },
          ]}
          source="status"
          helperText="Is the project ready?"
        />
        <SelectInput
          defaultValue="en"
          choices={[
            { name: 'Italian', id: 'it' },
            { name: 'English', id: 'en' },
          ]}
          source="language"
          helperText="The language of the project"
        />
        <TextInput
          source="title"
          label="Title (100)"
          fullWidth
          validate={[required(), maxLength(255)]}
          helperText="The project title"
        />

        <TextInput
          fullWidth
          placeholder="A good idea is to fill this area with a short but effective description"
          label="Description (255)"
          source="short_description"
          multiline
          helperText={'A small summary description'}
        />
        <TextInput
          fullWidth
          placeholder="Explain the project in few lines"
          label="Small project explanation (255)"
          source="project_explanation"
          multiline
          helperText={'An explanation of the project objective'}
        />
        <CustomRichTextInput
          placeholder="A good idea is to fill this area with the main concept of the project."
          helperText={'Describe the project'}
          label="About the project"
          source="long_description"
          glossaryTermsIds={record?.glossaryterm_set}
          referencesIds={record?.reference_set}
        />
      </FormTab>

      {record?.id && (
        <FormTab label="Experiments">
          <CustomRichTextInput
            source="experiments_description"
            helperText={'Describe what the experiments consist of'}
            placeholder="Describe briefly the experiments"
            small
            glossaryTermsIds={record?.glossaryterm_set}
            referencesIds={record?.reference_set}
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

      {record?.id && (
        <FormTab label="Glossary">
          <CustomRichTextInput
            source="glossary_description"
            helperText={'Describe the glossary section'}
            placeholder="Describe briefly the section"
            small
            glossaryTermsIds={record?.glossaryterm_set}
          />
          {record.user_level === '1' && (
            <>
              <AddGlossaryCategoryButton />
              <ReferenceManyField
                label="Glossary categories"
                reference="glossary-categories"
                target="project"
                fullWidth
              >
                <Datagrid>
                  <TextField source="title" />
                  <TextField source="description" />
                  <FunctionField
                    render={(record?: RaRecord) =>
                      record && record.project ? (
                        <EditButton record={record} />
                      ) : null
                    }
                  />
                  <FunctionField
                    render={(record?: RaRecord) =>
                      record && record.project ? (
                        <DeleteButton
                          record={record}
                          redirect={false}
                          mutationMode="optimistic"
                        />
                      ) : null
                    }
                  />
                </Datagrid>
              </ReferenceManyField>
            </>
          )}
          <AddGlossaryTermButton />
          <ReferenceArrayField
            label="Glossary terms"
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
      {record?.id && (
        <FormTab label="References">
          <AddReferenceButton refersTo="project" />

          <ReferenceArrayField
            label={false}
            reference="references"
            source="reference_set"
            fullWidth
          >
            <Datagrid>
              <RichTextField stripTags source="description" />
              <EditButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
      {record?.id && (
        <FormTab label="Footer">
          <ArrayInput label="Founded by:" source="footer.founded_by">
            <SimpleFormIterator>
              <TextInput
                fullWidth
                source="link"
                label="Link"
                validate={[required()]}
              />
              <ReferenceInputImage
                source="image"
                project={record.id}
                label="Image"
                fullWidth
                validate={[required()]}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput label="Partners:" source="footer.partners">
            <SimpleFormIterator>
              <TextInput
                fullWidth
                source="link"
                label="Link"
                validate={[required()]}
              />
              <ReferenceInputImage
                source="image"
                project={record.id}
                label="Image"
                fullWidth
                validate={[required()]}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <FormDataConsumer>
            {() => (
              <Typography variant="body2">
                <b>Contacts:</b>
              </Typography>
            )}
          </FormDataConsumer>
          <TextInput
            fullWidth
            source="footer.socials.facebook"
            label="Facebook"
          />
          <TextInput
            fullWidth
            source="footer.socials.twitter"
            label="Twitter"
          />
          <TextInput fullWidth source="footer.socials.mail" label="Mail" />
        </FormTab>
      )}
      {record?.id && (
        <FormTab label="Media">
          <ReferenceArrayField
            label=""
            reference="project-media"
            source="projectmedia_set"
            fullWidth
          >
            <Datagrid>
              <CustomFileField source="file" title="name" />
              <TextField source="file" label={'url'} />
              <TextField source="type" />
              <TextField source="description" />
              <EditButton />
              <DeleteButton redirect={false} mutationMode="optimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}

      {record?.id && record?.user_level === '1' && (
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
              <SelectField
                choices={[
                  { name: 'Author', id: '1' },
                  { name: 'Collaborator', id: '2' },
                ]}
                source="level"
              />
              <DeleteButton redirect={false} mutationMode="pessimistic" />
            </Datagrid>
          </ReferenceArrayField>
        </FormTab>
      )}
    </TabbedForm>
  );
};
