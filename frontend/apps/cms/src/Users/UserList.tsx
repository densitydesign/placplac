import {
  Datagrid,
  TextField,
  ListProps,
  List,
  BooleanField,
} from "react-admin";

export const UserList = (props: ListProps) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="email" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <BooleanField source="is_active" />
        <BooleanField source="is_superuser" />
      </Datagrid>
    </List>
  );
};
