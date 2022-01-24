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
          <h2 className="breadcumb">{'Experiment >'}</h2>
          {record && data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={
                <Typography color="textPrimary" variant="h4">{`>`}</Typography>
              }
            >
              <Link to={`/projects/${data.id}/1`}>
                <Typography variant="h3">{data.title}</Typography>
              </Link>
              <Link to={`/experiments/${record.id}`}>
                <Typography variant="h3">{record.title}</Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
