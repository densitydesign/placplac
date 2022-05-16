import { useMemo } from 'react';
import {
  DeleteButton,
  SaveButton,
  SimpleForm,
  SimpleFormProps,
  Toolbar,
  ToolbarProps,
  useRecordContext,
} from 'react-admin';
import { CustomRichTextInput } from '../../components/CustomRichTextInput';

const ReferenceFormToolbar = (props: ToolbarProps) => {
  const record = useRecordContext();
  return (
    <Toolbar
      style={{ display: 'flex', justifyContent: 'space-between' }}
      {...props}
    >
      <SaveButton />
      {record && record.id && record.project && (
        <DeleteButton redirect={`/projects/${record.project}/3`} />
      )}
      {record && record.id && record.experiment && (
        <DeleteButton redirect={`/experiments/${record.experiment}/5`} />
      )}
    </Toolbar>
  );
};

export const ReferenceForm = (props: Omit<SimpleFormProps, 'children'>) => {
  const record = useRecordContext();
  const redirectLink = useMemo(() => {
    if (props.defaultValues) {
      if ('project' in props.defaultValues && props.defaultValues.project) {
        return `/projects/${props.defaultValues.project}/3`;
      }
      if (
        'experiment' in props.defaultValues &&
        props.defaultValues.experiment
      ) {
        return `/experiments/${props.defaultValues.experiment}/5`;
      }
    }
    if (record) {
      if ('project' in record && record.project) {
        return `/projects/${record.project}/3`;
      }
      if ('experiment' in record && record.experiment) {
        return `/experiments/${record.experiment}/5`;
      }
    }
  }, [props.defaultValues, record]);

  return (
    <SimpleForm
      {...props}
      redirect={redirectLink}
      toolbar={<ReferenceFormToolbar />}
    >
      <CustomRichTextInput
        source="description"
        label="Description of reference"
        small
      />
    </SimpleForm>
  );
};
