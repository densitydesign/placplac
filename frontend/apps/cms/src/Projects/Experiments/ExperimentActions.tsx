import { Link } from 'ra-ui-materialui';
import { useGetOne, useRecordContext } from 'ra-core';
import { Typography, Breadcrumbs } from '@material-ui/core';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';

interface ExperimentActionsProps {
  project?: number | string;
}
export const ExperimentActions = (props: ExperimentActionsProps) => {
  const record = useRecordContext();
  const { data } = useGetOne('projects', record?.project, {
    enabled: !!record,
  });
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
    ></TopToolbarWithTitle>
  );
};
