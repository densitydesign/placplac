import { Link } from 'ra-ui-materialui';
import { useRecordContext } from 'ra-core';
import { Typography, Breadcrumbs } from '@material-ui/core';
import { useGetOne } from 'react-admin';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';

interface GlossaryTermActionsProps {
  project?: number | string;
}
export const GlossaryTermActions = (props: GlossaryTermActionsProps) => {
  const record = useRecordContext();
  const { data } = useGetOne('projects', record?.project, {
    enabled: !!record,
  });
  return (
    <TopToolbarWithTitle
      title={
        <>
          <Typography variant="h3">Glossary</Typography>
          {record && data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<Typography variant="h4">{`>`}</Typography>}
            >
              <Link to={`/projects/${data.id}/2`}>
                <Typography variant="h4">{data.title}</Typography>
              </Link>
              <Link to={`/glossary-terms/${record.id}`}>
                <Typography variant="h4">{record.title}</Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
