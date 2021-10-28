import { Card } from "@material-ui/core";
import {
  Datagrid,
  TextField,
  ListProps,
  DateField,
  SelectField,
} from "react-admin";
import { CustomList } from "../components/CustomList";
import { getDefaultListProps } from "../utils";

export const ProjectList = (props: ListProps) => {
  return (
    <CustomList {...getDefaultListProps(props)}>
      <Datagrid rowClick="edit">
        <TextField source="title" label="Titolo" />
        <DateField source="last_update" label="Ultima modifica" />
        <DateField source="created_date" label="Creato il " />
        <SelectField
          source="status"
          label="Stato"
          choices={[
            { id: "1", name: "Published" },
            { id: "2", name: "Draft" },
          ]}
        />
      </Datagrid>
    </CustomList>
  );
};
