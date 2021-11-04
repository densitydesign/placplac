import { cloneElement } from "react";
import {
  Datagrid,
  TextField,
  ListProps,
  DateField,
  SelectField,
  FunctionField,
  Record,
  CreateButton,
  ListActionsProps,
  TopToolbar,
  List,
} from "react-admin";
import { DownloadButton } from "./DownloadButton";
import { PreviewButton } from "./PreviewButton";

const ProjectListActions = (props: ListActionsProps) => (
  <TopToolbar>
    {props.filters && cloneElement(props.filters, { context: "button" })}
    <CreateButton />
  </TopToolbar>
);

export const ProjectList = (props: ListProps) => {
  return (
    <List actions={<ProjectListActions />} {...props}>
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
        <FunctionField
          label=""
          render={(record?: Record) => (
            <>
              {record && <PreviewButton project={record.id} />}
              {record && record.status === "1" && (
                <>
                  <DownloadButton project={record} />
                </>
              )}
            </>
          )}
        />
      </Datagrid>
    </List>
  );
};
