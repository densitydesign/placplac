import { Breadcrumbs, Typography } from '@mui/material';
import { Edit, EditProps, RaRecord, Link, useRecordContext } from 'react-admin';
import { TopToolbarWithTitle } from '../components/TopToolbarWithTitle';
import { DownloadButton } from './DownloadButton';
import { ExportButton } from './ExportButton';
import { PreviewButton } from './PreviewButton';

import { ProjectForm } from './ProjectForm';

const PostEditActions = () => {
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
      actions={<PostEditActions />}
      redirect="edit"
    >
      <ProjectForm />
    </Edit>
  );
};
