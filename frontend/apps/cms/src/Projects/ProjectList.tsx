import { Typography } from '@material-ui/core';
import { cloneElement } from 'react';
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
} from 'react-admin';
import { CustomList } from '../components/CustomList';
import { CloneButton } from './CloneButton';
import { DownloadButton } from './DownloadButton';
import { PreviewButton } from './PreviewButton';

const ProjectListActions = (props: ListActionsProps) => {
  return (
    <TopToolbar className={props.className}>
      {props.filters && cloneElement(props.filters, { context: 'button' })}
      <CreateButton />
    </TopToolbar>
  );
};

export const ProjectList = (props: ListProps) => {
  return (
    <CustomList
      breacrubms={<Typography variant="h3">Projects</Typography>}
      actions={<ProjectListActions />}
      {...props}
    >
      <Datagrid
        rowClick="edit"
        isRowSelectable={(record) => record.user_level === '1'}
      >
        <TextField source="title" />
        <DateField source="last_update" />
        <DateField source="created_date" />
        <SelectField
          source="status"
          choices={[
            { id: '1', name: 'Published' },
            { id: '2', name: 'Draft' },
          ]}
        />
        <SelectField
          source="language"
          choices={[
            { id: 'en', name: 'English' },
            { id: 'it', name: 'Italian' },
          ]}
        />
        <FunctionField
          label=""
          render={(record?: Record) => (
            <>
              {record && <PreviewButton project={record.id} />}
              {record && <CloneButton project={record.id} />}
              {record && record.status === '1' && (
                <DownloadButton project={record} />
              )}
            </>
          )}
        />
      </Datagrid>
    </CustomList>
  );
};
