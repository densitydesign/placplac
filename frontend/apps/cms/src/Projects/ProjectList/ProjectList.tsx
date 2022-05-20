import {
  Datagrid,
  TextField,
  DateField,
  SelectField,
  FunctionField,
  EditButton,
  List,
} from 'react-admin';
import { Project, ProjectUserLevel } from '../../types';
import { ProjectListActions } from './components/ProjectListActions';
import { ProjectListCard } from './components/ProjectListCard';
import { RowActionsButton } from './components/RowActionsButton';

export const ProjectList = () => {
  return (
    <List actions={<ProjectListActions />} component={ProjectListCard}>
      <Datagrid
        isRowSelectable={(record: Project) =>
          record.user_level === ProjectUserLevel.AUTHOR
        }
      >
        <FunctionField
          label="Title"
          render={(record: Project) =>
            record.user_level === ProjectUserLevel.VIEWER ? (
              <TextField source="title" />
            ) : (
              <EditButton variant="text" record={record} label={record.title} />
            )
          }
        />
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
        <RowActionsButton />
      </Datagrid>
    </List>
  );
};
