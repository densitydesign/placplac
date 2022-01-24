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
          <h2 className="breadcumb">{'Glossary >'}</h2>
          {record && data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={
                <Typography color="textPrimary" variant="h4">{`>`}</Typography>
              }
            >
              <Link to={`/projects/${data.id}/2`}>
                <Typography variant="h3">{data.title}</Typography>
              </Link>
              <Link to={`/glossary-terms/${record.id}`}>
                <Typography variant="h3">{record.title}</Typography>
              </Link>
            </Breadcrumbs>
          )}
        </>
      }
    ></TopToolbarWithTitle>
  );
};
