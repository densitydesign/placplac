import { Typography } from '@material-ui/core';
import {
  ArrayInput,
  Datagrid,
  DeleteButton,
  EditButton,
  FormDataConsumer,
  FormTab,
  FunctionField,
  maxLength,
  Record,
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

const ProjectFormToolbar = (props: ToolbarProps) => (
  <Toolbar
    style={{ display: 'flex', justifyContent: 'space-between' }}
    {...props}
  >
    <SaveButton />
    {props.record && props.record.id && props.record.user_level === '1' && (
      <DeleteButton />
    )}
  </Toolbar>
);
export const ProjectForm = (props: Omit<TabbedFormProps, 'children'>) => {
  return (
    <TabbedForm
      tabs={<Tabs />}
      {...props}
      redirect="edit"
      margin="dense"
      toolbar={<ProjectFormToolbar />}
    >
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
        <CustomRichTextInput
          placeholder="A good idea is to fill this area with the main concept of the project."
          helperText={'Describe the project'}
          label="About the project"
          source="long_description"
          glossaryTermsIds={props.record?.glossaryterm_set}
          referencesIds={props.record?.reference_set}
        />
      </FormTab>

      {props.record.id && (
        <FormTab label="Experiments">
          <CustomRichTextInput
            source="experiments_description"
            helperText={'Describe what the experiments consist of'}
            placeholder="Describe briefly the experiments"
            small
            glossaryTermsIds={props.record?.glossaryterm_set}
            referencesIds={props.record?.reference_set}
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

      {props.record.id && (
        <FormTab label="Glossary">
          <CustomRichTextInput
            source="glossary_description"
            helperText={'Describe the glossary section'}
            placeholder="Describe briefly the section"
            small
            glossaryTermsIds={props.record?.glossaryterm_set}
          />

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
                render={(record?: Record) =>
                  record && record.project ? (
                    <EditButton record={record} />
                  ) : null
                }
              />
              <FunctionField
                render={(record?: Record) =>
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
      {props.record.id && (
        <FormTab label="References">
          <AddReferenceButton refersTo="project" />

          <ReferenceArrayField
            label="References"
            addLabel={false}
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
      {props.record.id && (
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
                project={props.record.id}
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
                project={props.record.id}
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
      {props.record.id && (
        <FormTab label="Media">
          {/* <AddGlossaryTermButton /> */}
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

      {props.record.id && props.record.user_level === '1' && (
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
