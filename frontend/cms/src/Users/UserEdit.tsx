import {
  BooleanInput,
  FormTab,
  TabbedForm,
  TextInput,
  Edit,
  EditProps,
  TextField,
} from "react-admin";

export const UserEdit = (props: EditProps) => {
  return (
    <Edit mutationMode="pessimistic" {...props}>
      <TabbedForm>
        <FormTab label="Info">
          <TextField source="email" />
          <TextInput source="first_name" />
          <TextInput source="last_name" />
          <BooleanInput source="is_superuser" />
          <BooleanInput source="is_active" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
