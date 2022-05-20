import { Breadcrumbs } from '@mui/material';
import { Edit, Link, useRecordContext } from 'react-admin';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';
import { DownloadButton } from '../components/DownloadButton';
import { ExportButton } from '../components/ExportButton';
import { PreviewButton } from '../components/PreviewButton';
import { ProjectEditForm } from './components/ProjectEditForm';

const ProjectEditActions = () => {
  const record = useRecordContext();
  return (
    <TopToolbarWithTitle
      title={
        <>
          <span className="breadcumb">{'Project >'}</span>
          {record && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<span className="breadcumb-item">{`>`}</span>}
            >
              <Link to={`/projects/${record.id}`}>
                <span className="breadcumb-item">{record.title}</span>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    >
      {record && <PreviewButton project={record.id} />}
      {record && <ExportButton projectId={record.id} />}
      {record && record.status === '1' && <DownloadButton project={record} />}
    </TopToolbarWithTitle>
  );
};

export const ProjectEdit = () => {
  return (
    <Edit
      mutationMode="pessimistic"
      actions={<ProjectEditActions />}
      redirect="edit"
    >
      <ProjectEditForm />
    </Edit>
  );
};
