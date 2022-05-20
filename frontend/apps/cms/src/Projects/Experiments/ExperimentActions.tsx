import { Link } from 'react-admin';
import { useGetOne, useRecordContext } from 'react-admin';
import { Typography, Breadcrumbs } from '@mui/material';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';
import { PreviewButton } from '../components/PreviewButton';

interface ExperimentActionsProps {
  project?: number | string;
}
export const ExperimentActions = (props: ExperimentActionsProps) => {
  const record = useRecordContext();
  const { data } = useGetOne(
    'projects',
    { id: record?.project },
    {
      enabled: !!record,
    }
  );
  return (
    <TopToolbarWithTitle
      title={
        <>
          <span className="breadcumb">{'Experiment >'}</span>
          {record && data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<span className="breadcumb-item">{`>`}</span>}
            >
              <Link to={`/projects/${data.id}/1`}>
                <span className="breadcumb-item">{data.title}</span>
              </Link>
              <Link to={`/experiments/${record.id}`}>
                <span className="breadcumb-item">{record.title}</span>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    >
      {data && <PreviewButton project={data.id} />}
    </TopToolbarWithTitle>
  );
};
