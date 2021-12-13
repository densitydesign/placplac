import { Typography } from "@material-ui/core";
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
} from "react-admin";
import { CustomList } from "../components/CustomList";
import { DownloadButton } from "./DownloadButton";
import { PreviewButton } from "./PreviewButton";

const ProjectListActions = (props: ListActionsProps) => {
  return (
    <TopToolbar className={props.className}>
      {props.filters && cloneElement(props.filters, { context: "button" })}
      <CreateButton />
    </TopToolbar>
  );
};

export const ProjectList = (props: ListProps) => {
  return (
    <CustomList
      breacrubms={<Typography variant="h5">Projects</Typography>}
      actions={<ProjectListActions />}
      {...props}
    >
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
    </CustomList>
  );
};
