import {
  Box,
  Breadcrumbs,
  Card,
  Typography,
  TableContainer,
} from '@mui/material';
import React, { cloneElement, ReactNode } from 'react';
import {
  Datagrid,
  TextField,
  ListProps,
  DateField,
  SelectField,
  FunctionField,
  RaRecord,
  CreateButton,
  ListActionsProps,
  TopToolbar,
  EditButton,
  List,
} from 'react-admin';

import { CloneButton } from './CloneButton';
import { DownloadButton } from './DownloadButton';
import { ExportButton } from './ExportButton';
import { ImportProjectButton } from './ImportProjectButton';
import { PreviewButton } from './PreviewButton';

const ProjectListActions = (props: ListActionsProps) => {
  return (
    <TopToolbar className={props.className}>
      {props.filters && cloneElement(props.filters, { context: 'button' })}
      <ImportProjectButton />
      <CreateButton />
    </TopToolbar>
  );
};
const CardWithBreadCumb: React.FC = (props) => {
  return (
    <>
      <Typography variant="h3">Projects</Typography>
      <Card style={{ overflow: 'inherit' }}>{props.children}</Card>
    </>
  );
};
export const ProjectList = () => {
  return (
    <List actions={<ProjectListActions />} component={CardWithBreadCumb}>
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
          render={(record?: RaRecord) => (
            <>
              {record && <EditButton record={record} />}
              {record && <PreviewButton project={record.id} />}
              {record && <CloneButton project={record.id} />}
              {record && <ExportButton projectId={record.id} />}
              {record && record.status === '1' && (
                <DownloadButton project={record} />
              )}
            </>
          )}
        />
      </Datagrid>
    </List>
  );
};
