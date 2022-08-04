import { Link } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { Typography, Breadcrumbs } from '@mui/material';
import { RichTextField, useGetOne } from 'react-admin';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';
import { PreviewButton } from '../components/PreviewButton';

export const ReferenceActions = () => {
  const record = useRecordContext();

  const { data: project } = useGetOne(
    'projects',
    { id: record?.project },
    {
      enabled: !!record?.project,
    }
  );
  return (
    <TopToolbarWithTitle
      title={
        <>
          <span className="breadcumb">{'References >'}</span>
          {record && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<span className="breadcumb-item">{`>`}</span>}
            >
              {project && (
                <Link to={`/projects/${project.id}/3`}>
                  <span className="breadcumb-item">{project.title}</span>
                </Link>
              )}

              <Link to={`/references/${record.id}`}>
                <span
                  className="breadcumb-item"
                  dangerouslySetInnerHTML={{ __html: record.in_text_citation }}
                ></span>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    >
      {project && <PreviewButton project={project.id} />}
    </TopToolbarWithTitle>
  );
};
