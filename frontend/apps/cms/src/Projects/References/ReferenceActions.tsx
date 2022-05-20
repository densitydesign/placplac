import { Link } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { Typography, Breadcrumbs } from '@mui/material';
import { RichTextField, useGetOne } from 'react-admin';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';
import { PreviewButton } from '../components/PreviewButton';

export const ReferenceActions = () => {
  const record = useRecordContext();

  const { data: experiment } = useGetOne(
    'experiments',
    { id: record?.experiment },
    {
      enabled: !!record?.experiment,
    }
  );
  const { data: project } = useGetOne(
    'projects',
    { id: record?.project ? record.project : experiment?.project },
    {
      enabled: !!record?.project || !!experiment?.project,
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
              {experiment && (
                <Link to={`/experiments/${experiment.id}/5`}>
                  <span className="breadcumb-item">{experiment.title}</span>
                </Link>
              )}
              <Link to={`/references/${record.id}`}>
                <span className="breadcumb-item">
                  <RichTextField
                    variant="inherit"
                    stripTags
                    source="id"
                    record={{
                      id: record.description.substring(0, 20).trimEnd() + '...',
                    }}
                  />
                </span>
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
