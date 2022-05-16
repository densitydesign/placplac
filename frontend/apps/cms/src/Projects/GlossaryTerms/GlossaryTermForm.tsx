import {
  ArrayInput,
  DeleteButton,
  maxLength,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  SimpleFormProps,
  TextInput,
  Toolbar,
  ToolbarProps,
  useRecordContext,
} from 'react-admin';
import { CustomRichTextInput } from '../../components/CustomRichTextInput';
import { ReferenceInputImage } from '../../components/ReferenceInputImage';

const GlossaryTermFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && record.id && (
        <DeleteButton redirect={`/projects/${record.project}/2`} />
      )}
    </Toolbar>
  );
};

export const GlossaryTermForm = (props: Omit<SimpleFormProps, 'children'>) => {
  const record = useRecordContext();

  const project =
    props.defaultValues && 'project' in props.defaultValues
      ? props.defaultValues.project
      : record?.project;
  const redirect = `/projects/${project}/2`;

  return (
    <SimpleForm
      {...props}
      redirect={redirect}
      toolbar={<GlossaryTermFormToolbar />}
    >
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
        label={false}
      />
      <ArrayInput label="Other material" source="more_info_url">
        <SimpleFormIterator getItemLabel={(index) => `${index + 1}. link`}>
          <TextInput
            validate={[required()]}
            fullWidth
            source="title"
            label="Title"
          />
          <TextInput
            validate={[required()]}
            fullWidth
            source="url"
            label={'Url'}
          />
        </SimpleFormIterator>
      </ArrayInput>
      <ReferenceArrayInput
        label="Related terms"
        source="related"
        fullWidth
        reference="glossary-terms"
        filter={{ project }}
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>
      <ReferenceInputImage source="image" project={project} />
    </SimpleForm>
  );
};
