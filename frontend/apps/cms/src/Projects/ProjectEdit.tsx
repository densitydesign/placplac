import { Breadcrumbs, Typography } from '@material-ui/core';
import { Edit, EditProps, Record, Link } from 'react-admin';
import { TopToolbarWithTitle } from '../components/TopToolbarWithTitle';
import { DownloadButton } from './DownloadButton';
import { PreviewButton } from './PreviewButton';

import { ProjectForm } from './ProjectForm';

const PostEditActions = ({ data }: { data?: Record }) => {
  return (
    <TopToolbarWithTitle
      title={
        <>
          <span className="breadcumb">{'Project >'}</span>
          {data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<span className="breadcumb-item">{`>`}</span>}
            >
              <Link to={`/projects/${data.id}`}>
                <span className="breadcumb-item">{data.title}</span>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    >
      {data && <PreviewButton project={data.id} />}
      {data && data.status === '1' && <DownloadButton project={data} />}
    </TopToolbarWithTitle>
  );
};

export const ProjectEdit = (props: EditProps) => {
  return (
    <Edit
      title="idinjadjiajnd"
      mutationMode="pessimistic"
      {...props}
      actions={<PostEditActions />}
    >
      <ProjectForm />
    </Edit>
  );
};
