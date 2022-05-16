import { Link } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { Typography, Breadcrumbs } from '@mui/material';
import { useGetOne } from 'react-admin';
import { TopToolbarWithTitle } from '../../components/TopToolbarWithTitle';
import { PreviewButton } from '../PreviewButton';

interface GlossaryCategoryActionsProps {
  project?: number | string;
}
export const GlossaryCategoryActions = (
  props: GlossaryCategoryActionsProps
) => {
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
          <span className="breadcumb">{'Glossary >'}</span>
          {record && data && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<span className="breadcumb-item">{`>`}</span>}
            >
              <Link to={`/projects/${data.id}/2`}>
                <span className="breadcumb-item">{data.title}</span>
              </Link>
              <Link to={`/glossary-categories/${record.id}`}>
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
